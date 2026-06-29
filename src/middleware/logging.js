import { connection } from "../service/db.js";

export async function logRequest(ctx) {
  // Creates an db entry of the request with the context
  // Filtering out static or they would clutter the log a lot
  if (!ctx.serveStatic) {
    const logEntry = {
      time: ctx.logTime.toString(),
      processTime: new Date() - ctx.logTime,
      method: ctx.method,
      status: ctx.status ?? 500,
      url: ctx.url.href,
    };
    add(logEntry);
  }
}

export async function create() {
  // Create requestLog table if not exist
  const db = connection();
  await db.queryArray`
    CREATE TABLE IF NOT EXISTS public."requestLog" (
      "id" SERIAL NOT NULL PRIMARY KEY,
      "time"	    TEXT NOT NULL,
      "processTime"	INTEGER NOT NULL,
      "method"	    TEXT NOT NULL,
      "status"	    INTEGER NOT NULL,
      "url"	        TEXT NOT NULL
    )
    `;
}

async function add({ time, processTime, method, status, url }) {
  // Adds a new log entry into the table
  const db = connection();

  await db.queryArray`
    INSERT INTO public."requestLog" ("time", "processTime", "method", "status", "url")
    VALUES (${time}, ${processTime}, ${method}, ${status}, ${url})
  `;
}
