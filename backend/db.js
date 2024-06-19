const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS discussions (id INTEGER PRIMARY KEY AUTOINCREMENT, transcripts TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, device_id TEXT)"); // device_idカラムを追加
  db.run("CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, user TEXT, count INTEGER, UNIQUE(post_id, user))");
});

module.exports = db;
