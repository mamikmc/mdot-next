// scripts/fix-image-urls.mjs
// 使い方: node scripts/fix-image-urls.mjs
// archivesの全記事の画像URLを置換する

import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

const OLD_URL = "http://wonderbaby.net/mdot";
const NEW_URL = "https://mdot.jp";

// 全件取得（100件ずつ）
async function fetchAll() {
  const first = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/archives?limit=100&offset=0`,
    { headers: { "X-MICROCMS-API-KEY": API_KEY } }
  ).then((r) => r.json());

  const total = first.totalCount;
  let contents = [...first.contents];

  for (let offset = 100; offset < total; offset += 100) {
    const res = await fetch(
      `https://${SERVICE_DOMAIN}.microcms.io/api/v1/archives?limit=100&offset=${offset}`,
      { headers: { "X-MICROCMS-API-KEY": API_KEY } }
    ).then((r) => r.json());
    contents = [...contents, ...res.contents];
  }

  return contents;
}

// 1件更新
async function patchArchive(id, content) {
  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/archives/${id}`,
    {
      method: "PATCH",
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PATCH error: ${res.status} ${err}`);
  }

  return res.json();
}

// メイン処理
async function main() {
  console.log("archives全件取得中...");
  const archives = await fetchAll();
  console.log(`取得: ${archives.length}件`);

  let success = 0;
  let skip = 0;
  let noChange = 0;

  for (const archive of archives) {
    if (!archive.content.includes(OLD_URL)) {
      noChange++;
      continue;
    }

    const newContent = archive.content.replaceAll(OLD_URL, NEW_URL);

    try {
      await patchArchive(archive.id, newContent);
      console.log(`✓ ${archive.title}`);
      success++;
      await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
      console.error(`✗ ${archive.title}: ${e.message}`);
      skip++;
    }
  }

  console.log(
    `\n完了！ 更新: ${success}件 / 失敗: ${skip}件 / 変更なし: ${noChange}件`
  );
}

main().catch(console.error);
