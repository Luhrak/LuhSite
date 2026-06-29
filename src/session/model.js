import { connection } from "../service/db.js";

export async function create() {
  // Creates sessions table if not exist
  const db = connection();
  await db.queryArray`
    CREATE TABLE IF NOT EXISTS public."sessions" (
      "key"         NOT NULL PRIMARY KEY,
      "session"	    TEXT NOT NULL,
      "maxage"      TEXT NOT NULL,
      "date"        DATE NOT NULL
    )
    `;
}

export async function get(key) {
  // Gets one entry with all columns via key
  const db = connection();
  return (
    await db.queryObject`
    SELECT "key", "session", "maxage", "date"
    FROM public."sessions"
    WHERE key = ${key}
  `
  ).rows[0];
}

export async function set({ key, session, maxage }) {
  // Adds a new entry
  const db = connection();
  const currentDate = Date.now();
  return (
    await db.queryObject`
    INSERT INTO public."sessions" ("key", "session", "maxage", "date")
    VALUES (${key}, ${session}, ${maxage}, ${currentDate})
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
  // Deltes the session thats over max age
  const currentSession = get(key);
  if (currentSession.maxAge <= Date.now() - currentSession.date) {
    remove(key);
  }
}
