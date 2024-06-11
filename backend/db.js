const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS discussions (id INTEGER PRIMARY KEY AUTOINCREMENT, transcripts TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS votes (post_id INTEGER, user TEXT, count INTEGER, PRIMARY KEY (post_id, user), FOREIGN KEY(post_id) REFERENCES posts(id))");
});

module.exports = db;
