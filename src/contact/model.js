import { connection } from "../service/db.js";

export async function create() {
  // Creates messages table if not exist
  const db = connection();
  // is_new is a basically a bool but sqlite uses int instead
  await db.queryArray`
    CREATE TABLE IF NOT EXISTS public."messages" (
      "id" SERIAL NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "subject" TEXT NOT NULL,
      "message" TEXT NOT NULL,
      "is_new" INTEGER NOT NULL DEFAULT 1,
      "created_at" TEXT NOT NULL
    )
  `;
}

export async function list() {
  // Gets a list with all entries
  const db = connection();
  return (
    await db.queryObject`
      SELECT "id", "name", "email", "subject", "message"
      FROM public."messages"
      ORDER BY id DESC
    `
  ).rows;
}

export async function listNew() {
  // List all not read messages
  const db = connection();
  return (
    await db.queryObject`
      SELECT "id", "name", "email", "subject", "message", "created_at"
      FROM public."messages"
      WHERE is_new = 1
      ORDER BY created_at DESC
    `
  ).rows;
}

export async function listRead() {
  // List all read messages
  const db = connection();
  return (
    await db.queryObject`
      SELECT "id", "name", "email", "subject", "message", "created_at"
      FROM public."messages"
      WHERE is_new = 0
      ORDER BY created_at DESC
    `
  ).rows;
}

export async function get(id) {
  // Get one entry with all columns via id
  const db = connection();
  return (
    await db.queryObject`
      SELECT "id", "name", "email", "subject", "message"
      FROM public."messages"
      WHERE id = ${id}
    `
  ).rows[0];
}

export async function add({ name, email, subject, message }) {
  // Add new contact entry
  const db = connection();
  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);
  return (
    await db.queryObject`
      INSERT INTO public."messages" ("name", "email", "subject", "message", "is_new", "created_at")
      VALUES (${name}, ${email}, ${subject}, ${message}, 1, ${createdAt})
      RETURNING "id"
    `
  ).rows[0].id;
}

export async function remove(id) {
  // Delete one entry via id
  const db = connection();
  return (
    await db.queryObject`
      DELETE FROM public."messages" WHERE id = ${id}
    `
  ).rows[0];
}

export async function markAsRead(id) {
  // Mark one entry as read
  const db = connection();
  await db.queryObject`
      UPDATE public."messages"
      SET "is_new" = 0
      WHERE id = ${id}
    `;
}
