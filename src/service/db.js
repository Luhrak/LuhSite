import { DatabaseSync } from "node:sqlite";
import { Client } from "jsr:@db/postgres";

let _db = null;
let _client = null;

export async function initConnection(info) {
  // Initialize connetion to databank
  if (!_client) {
    _client = new Client(info); // Also creates the file if not exist
    await _client.connect();
  }
}

export function connection() {
  // Get current connection
  if (!_client) {
    throw new Error(
      "DB connection not initialized. Call initConnection() first.",
    );
  }
  return _client;
}
