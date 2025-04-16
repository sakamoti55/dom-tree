// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// publicフォルダ内の静的ファイルを配信
app.use(express.static("public"));

// /fetch エンドポイント
app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "URLパラメータがありません" });
  }
  try {
    // 対象サイトのHTMLを取得
    const response = await axios.get(url);
    res.json({ html: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "URLの取得に失敗しました" });
  }
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動中`);
});
