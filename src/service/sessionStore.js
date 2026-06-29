import { createSessionStore as create } from "../feature/session/sessionStore.js";

let _storage;

export function createSessionStore() {
  // Creates a static sessiionStore
  _storage = create();
}

export const sessionStore = () => _storage;
