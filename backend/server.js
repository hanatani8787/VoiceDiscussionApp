const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS設定
app.use(cors());

// JSONリクエストボディのパース設定
app.use(bodyParser.json());

// POSTリクエストを処理するエンドポイント
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  // ここでデータベースに保存するなどの処理を行う
  console.log('受信したタイトル:', title);
  console.log('受信したコンテンツ:', content);

  // 成功レスポンスを返す
  res.status(200).send('投稿が完了しました');
});

// サーバーを起動する
app.listen(port, () => {
  console.log(`サーバーがhttp://localhost:${port}で起動しました`);
});
