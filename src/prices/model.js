import { connection } from "../service/db.js";

// Create prices table if not exist
export function create() {
  const db = connection();
  const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      previewfile TEXT NOT NULL,
      title TEXT NOT NULL,
      price INTEGER NOT NULL,
      short_description TEXT,
      description TEXT NOT NULL
    )
  `);
  return stmt.all();
}

// Only for overview (images)
export function listVisualOnly() {
  const db = connection();
  return db
    .prepare(
      `
    SELECT id, previewfile, title FROM prices
    `
    )
    .all();
}

// Full list
export function list() {
  const db = connection();
  return db.prepare(`
    SELECT
      id,
      previewfile,
      title,
      price,
      short_description,
      description
    FROM prices
    ORDER BY id DESC
  `).all();
}
// Single entry
export function get(id) {
  const db = connection();
  return db
    .prepare(
      `
    SELECT id, previewfile, title, price, short_description, description
    FROM prices
    WHERE id = ?
  `
    )
    .get(id);
}

// Add new entry
export function add({ previewfile, title, description, price, short_description }) {
  const db = connection();
  const result = db
    .prepare(
      `
    INSERT INTO prices (previewfile, title, price, short_description, description)
    VALUES (?, ?, ?, ?, ?)
  `
    )
    .run(previewfile, title, price, short_description, description);

  return result.lastInsertRowid;
}

// Update entry
export function update(id, { previewfile, title, price, short_description, description }) {
   const db = connection();
  const stmt = db.prepare(
    `
    UPDATE prices
    SET previewfile = ?, title = ?, price = ?, short_description = ?, description = ?
    WHERE id = ?
  `
  );
  stmt.run(previewfile, title, price, short_description, description, id);

  return id;
}

// Delete entry
export function del(id) {
  const db = connection();
  return db
    .prepare(
      `
    DELETE FROM prices WHERE id = ?
  `
    )
    .run(id);
}
