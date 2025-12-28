import { handleRequest } from "./src/app.js";

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);
Deno.serve({ port: port }, handleRequest);
// deno run --allow-net --allow-read --allow-write --watch server.js
