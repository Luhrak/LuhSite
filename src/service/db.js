import { DatabaseSync } from "node:sqlite";
import { create as createGalleryTable } from "../gallery/model.js";
import { create as createPricesTable } from "../prices/model.js";
import { create as createMessagesTable } from "../contact/model.js";
import { create as createAccountsTable } from "../accounts/model.js";
import { create as createLoggingTable } from "../middleware/logging.js";

let _db = null;

export function initConnection(path) {
  // initialize connetion to databank
  if (!_db) {
    _db = new DatabaseSync(path); // Also creates the file if not exist
    _db.exec("PRAGMA foreign_keys = ON;"); // else foreign keys wont work
  }
  return _db;
}

export function connection() {
  // Get current connection
  if (!_db) {
    throw new Error(
      "DB connection not initialized. Call initConnection() first."
    );
  }
  return _db;
}
