// scripts/wp-to-microcms.mjs
// 使い方: node scripts/wp-to-microcms.mjs
//
// 必要なパッケージ: npm install xml2js node-fetch dotenv
// .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY が必要

import fs from "fs";
import xml2js from "xml2js";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;
const XML_PATH = "./mdot.WordPress.2026-02-23.xml";

// ─── WordPressカテゴリー → microCMSカテゴリー マッピング ───
const CATEGORY_MAP = {
  // ガーデン
  "ガーデン garden": "garden",
  ガーデン: "garden",

  // カメラ
  "カメラ camera": "camera",
  カメラ: "camera",

  // フード・料理・パン
  "お料理 food": "food",
  お家ごはん: "food",
  パン: "bakery",
  おうちでパン焼き: "bakery",
  イングリッシュマフィン: "bakery",
  チャパタ: "bakery",
  塩パン: "bakery",
  天然酵母: "bakery",
  酵母: "bakery",
  イースト: "bakery",
  "panier de pain": "bakery",

  // インテリア
  "インテリア　interior": "interior",
  インテリア: "interior",

  // ハンドメイド
  ハンドメイド: "handmade",
  handmade: "handmade",
  手作り: "handmade",
  ものづくり: "handmade",
  布小物: "handmade",
  刺繍: "handmade",
  "タティングレース tating laces": "handmade",
  かご制作: "handmade",
  カルトナージュ: "handmade",
  "バッグ bags": "handmade",
  レッスンバッグ: "handmade",
  移動ポケット: "handmade",
  マスク: "handmade",
  リボン柄: "handmade",
  ギャザースカート: "handmade",
  シューバッグ: "handmade",
  キッズエプロン: "handmade",
  ランチバッグ: "handmade",

  // イベント
  "イベント・マルシェ": "event",
  ハンドメイドマルシェ: "event",
  ワークショップ: "event",
  "ワークショップ workshop": "event",
  event: "event",

  // ショップ
  "mdot shop": "shop",
  "商品 products": "shop",
  新商品: "shop",
  お勧め商品: "shop",
  minne: "shop",

  // ミュージック
  バイオリン: "music",
  violin: "music",

  // ニュース・お知らせ
  "お知らせ information": "news",
  "おしごと works": "news",
  "子育て mom's job": "news",

  // ペット
  Cat: "pet",
};

// ─── WordPressショートコードを除去（imgタグは保持）───
function cleanContent(html) {
  if (!html) return "";
  return (
    html
      // captionの中身（imgタグなど）は残す
      .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, "$1")
      // aタグで囲まれたimgだけ取り出す
      .replace(/<a[^>]*>(\s*<img[^>]*>\s*)<\/a>/gi, "$1")
      // その他のショートコードは除去
      .replace(/\[[^\]]+\]/g, "")
      .trim()
  );
}

// ─── カテゴリーをマッピング（複数カテゴリー対応） ───
function mapCategories(categories) {
  const mapped = new Set();
  for (const cat of categories) {
    const name = cat._ || cat;
    if (CATEGORY_MAP[name]) {
      mapped.add(CATEGORY_MAP[name]);
    }
  }
  return Array.from(mapped);
}

// ─── microCMS に投稿 ───
async function postToMicroCMS(post) {
  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/archives`,
    {
      method: "POST",
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`microCMS error: ${res.status} ${err}`);
  }

  return res.json();
}

// ─── メイン処理 ───
async function main() {
  console.log("XMLを読み込み中...");
  const xml = fs.readFileSync(XML_PATH, "utf-8");
  const result = await xml2js.parseStringPromise(xml);
  const items = result.rss.channel[0].item || [];

  // publishedの記事だけ抽出
  const posts = items.filter(
    (item) =>
      item["wp:post_type"]?.[0] === "post" &&
      item["wp:status"]?.[0] === "publish"
  );

  console.log(`対象記事数: ${posts.length}件`);
  // const testPosts = posts.slice(0, 3); // テスト用3件
  let success = 0;
  let skip = 0;

  for (const item of posts) {
    // 全件移行時はpostsに変更
    const title = item.title?.[0] || "";
    const date = item["wp:post_date"]?.[0] || "";
    const content = cleanContent(item["content:encoded"]?.[0] || "");
    const categories = mapCategories(item.category || []);

    // カテゴリーが1つもマッピングできなかった場合はnewsにする
    if (categories.length === 0) {
      categories.push("news");
    }

    const post = {
      title,
      date: new Date(date).toISOString(),
      content,
      category: categories,
    };

    try {
      await postToMicroCMS(post);
      console.log(`✓ ${title}`);
      success++;
      await new Promise((r) => setTimeout(r, 1500));
    } catch (e) {
      console.error(`✗ ${title}: ${e.message}`);
      skip++;
    }
  }

  console.log(`\n完了！ 成功: ${success}件 / 失敗: ${skip}件`);
}

main().catch(console.error);
