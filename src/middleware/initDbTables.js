import { create as createGalleryTable } from "../gallery/model.js";
import { create as createPricesTable } from "../prices/model.js";
import { create as createMessagesTable } from "../contact/model.js";
import { create as createAccountsTable } from "../accounts/model.js";
import { create as createLoggingTable } from "../middleware/logging.js";

export function initDbTables() {
  createGalleryTable();
  createPricesTable();
  createMessagesTable();
  createAccountsTable();
  createLoggingTable();
}
