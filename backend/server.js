const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let discussions = [];
let posts = [];

app.post('/discussions', (req, res) => {
  const { transcripts } = req.body;
  discussions.push({ id: discussions.length + 1, transcripts });
  res.status(200).send('ディスカッション内容が保存されました');
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.status(200).send('投稿が完了しました');
});

app.listen(port, () => {
  console.log(`サーバーがhttp://localhost:${port}で起動しました`);
});
