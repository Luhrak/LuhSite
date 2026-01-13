import { createSessionStore as create } from "../lib/sessionStore.js";

let _storage;

export function createSessionStore() {
  _storage = create();
}

export const sessionStore = () => _storage;
