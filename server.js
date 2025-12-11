import { handleRequest } from "./src/app.js";

const port = 8080;
Deno.serve({ port: port }, handleRequest);
