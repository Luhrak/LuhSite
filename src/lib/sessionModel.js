import { connection } from "../service/db.js";

export async function create() {
  // Creates sessions table if not exist
  const db = connection();
  await db.queryArray`
    CREATE TABLE IF NOT EXISTS public."sessions" (
      "key"         NOT NULL PRIMARY KEY,
      "session"	    TEXT NOT NULL,
      "maxage"      TEXT NOT NULL
      "date"        
    )
    `;
}

export async function get(key) {
  // Gets one entry with all columns via key
  const db = connection();
  return (
    await db.queryObject`
    SELECT "key", "session", "maxage"
    FROM public."sessions"
    WHERE key = ${key}
  `
  ).rows[0];
}

export async function set({ key, session, maxage }) {
  // Adds a new entry
  const db = connection();
  return (
    await db.queryObject`
    INSERT INTO public."sessions" ("key", "session", "maxage")
    VALUES (${key}, ${session}, ${maxage})
    RETURNING "key"
  `
  ).rows[0].key;
}

export async function remove(key) {
  // Delets one entry via key
  const db = connection();
  return (
    await db.queryObject`
    DELETE 
    FROM public."gallery"
    WHERE key = ${key}
  `
  ).rows[0];
}

export async function applyTimeout(key, maxAge) {
    const currentSession = get(key);
    if (currentSession.maxAge <= 
  const db = connection();
  let result = (
    await db.queryObject`
    SELECT "key", "session", "maxage"
    FROM public."sessions"
    WHERE session = ${session}
  `
  ).rows[0];
  return result;
}
