const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // db.jsをインポート

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/discussions', (req, res) => {
  const { transcripts } = req.body;

  const stmt = db.prepare("INSERT INTO discussions (transcripts) VALUES (?)");
  stmt.run(JSON.stringify(transcripts), function(err) {
    if (err) {
      console.error('Error inserting discussion:', err.message);
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).send({ id: this.lastID });
  });
  stmt.finalize();
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  const stmt = db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
  stmt.run(title, content, function(err) {
    if (err) {
      console.error('Error inserting post:', err.message);
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).send({ id: this.lastID });
  });
  stmt.finalize();
});

app.get('/posts', (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      console.error('Error fetching posts:', err.message);
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error('Error fetching post:', err.message);
      res.status(500).send({ error: err.message });
      return;
    }
    if (!row) {
      console.error('Post not found:', id);
      res.status(404).send({ error: 'Post not found' });
      return;
    }
    res.status(200).json(row);
  });
});

app.post('/votes', (req, res) => {
  const { post_id, user } = req.body;

  console.log('Received vote:', { post_id, user });

  const stmt = db.prepare("INSERT INTO votes (post_id, user, count) VALUES (?, ?, 1) ON CONFLICT(post_id, user) DO UPDATE SET count = count + 1");
  stmt.run(post_id, user, function(err) {
    if (err) {
      console.error('Error inserting vote:', err.message);
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).send({ id: this.lastID });
  });
  stmt.finalize();
});

app.get('/votes/:post_id', (req, res) => {
  const { post_id } = req.params;
  db.all("SELECT user, count FROM votes WHERE post_id = ?", [post_id], (err, rows) => {
    if (err) {
      console.error('Error fetching votes:', err.message);
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`サーバーがhttp://localhost:${port}で起動しました`);
});
