// replace-image-urls.mjs
// 実行前に以下を設定してください
const API_KEY = "D6MZxi8gdS5KutaVWOY2gRwrtjoFrckdqI1g"; // ここに書かずに環境変数推奨
const SERVICE_DOMAIN = "mdot-next";
const ENDPOINT = "archives";
const OLD_DOMAIN = "https://mdot.jp";
const NEW_DOMAIN = "https://assets.mdot.jp";

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${ENDPOINT}`;
const HEADERS = {
  "X-MICROCMS-API-KEY": API_KEY,
  "Content-Type": "application/json",
};

async function fetchAllContents() {
  let allContents = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetch(
      `${BASE_URL}?limit=${limit}&offset=${offset}&fields=id,content`,
      {
        headers: HEADERS,
      }
    );
    const data = await res.json();
    allContents = allContents.concat(data.contents);
    if (allContents.length >= data.totalCount) break;
    offset += limit;
  }

  return allContents;
}

async function replaceUrls() {
  console.log("全記事を取得中...");
  const contents = await fetchAllContents();
  console.log(`${contents.length}件取得しました`);

  let updatedCount = 0;

  for (const item of contents) {
    if (!item.content || !item.content.includes(OLD_DOMAIN)) continue;

    const newContent = item.content.replaceAll(OLD_DOMAIN, NEW_DOMAIN);

    const res = await fetch(`${BASE_URL}/${item.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ content: newContent }),
    });

    if (res.ok) {
      console.log(`✅ 更新: ${item.id}`);
      updatedCount++;
    } else {
      console.log(`❌ 失敗: ${item.id}`, await res.text());
    }

    // API制限対策で少し待つ
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n完了！ ${updatedCount}件更新しました`);
}

replaceUrls().catch(console.error);
