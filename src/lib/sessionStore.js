export function createSessionStore() {
  const sessionStore = new Map();

  return {
    get(key) {
      const data = sessionStore.get(key);
      if (!data) return;
      return data.maxAge < Date.now() ? this.delete(key) : data.session;
    },
    set(key, session, maxAge) {
      sessionStore.set(key, {
        session,
        maxAge: Date.now() + maxAge,
      });
    },
    delete(key) {
      sessionStore.delete(key);
    },
    applyTimeout() {
      /* @TDB Remove old sessions */
    },
  };
}
