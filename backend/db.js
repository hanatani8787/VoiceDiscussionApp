const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS discussions (id INTEGER PRIMARY KEY AUTOINCREMENT, transcripts TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)");
});

module.exports = db;
