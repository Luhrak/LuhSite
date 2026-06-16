import { createSessionStore } from "./src/service/sessionStore.js";
import { initConnection } from "./src/service/db.js";
import { initDbTables } from "./src/middleware/initDbTables.js";
import { handleRequest } from "./src/app.js";

const port = 8080;
const hostname = "127.0.0.1";

const required = (name) => {
  const v = Deno.env.get(name);
  if (v === undefined) throw new Error(`Missing env: ${name}`);
  return v;
};

createSessionStore();
const db = await initConnection({
  hostname: required("PGHOST"),
  port: required("PGPORT"),
  user: required("PGUSER"),
  password: required("PGPASSWORD"),
  database: required("PGDATABASE"),
});
initDbTables();

Deno.serve({ port, hostname }, handleRequest);
