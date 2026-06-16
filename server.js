import { createSessionStore } from "./src/service/sessionStore.js";
import { initConnection } from "./src/service/db.js";
import { initDbTables } from "./src/middleware/initDbTables.js";
import { handleRequest } from "./src/app.js";

const port = 8080;
const hostname = "127.0.0.1";
const DB_PATH = "postgresql://luh:sql@localhost:5432/site_data";

createSessionStore();
const db = await initConnection(DB_PATH);
initDbTables();

Deno.serve({ port, hostname }, handleRequest);
