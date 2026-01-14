import { sessionStore } from "../service/sessionStore.js";
import { encodeBase64 } from "jsr:@std/encoding/base64";
import { getCookies, setCookie, deleteCookie } from "jsr:@std/http";

export function getSession(ctx) {
  // Sets cookies and session into context
  ctx.cookies = getCookies(ctx.request.headers);
  ctx.sessionId = ctx.cookies?.sessionId;
  ctx.session = sessionStore().get(ctx.sessionId) ?? {};

  // Get and remove flash message out of session
  ctx.flash = ctx.session.flash;
  delete ctx.session.flash;
  return ctx;
}

export function saveSession(ctx) {
  // Session saved to cookie and store if it holds data, deletes it if not
  if (hasData(ctx.session)) {
    ctx.sessionId = ctx.sessionId ?? createId();
    sessionStore().set(ctx.sessionId, ctx.session);
    setCookie(ctx.headers, { name: "sessionId", value: ctx.sessionId });
  } else {
    sessionStore().delete(ctx.sessionId);
    deleteCookie(ctx.headers, "sessionId");
  }
}

const hasData = (session) => Object.values(session).some((it) => Boolean(it));

export const createId = () => {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return encodeBase64(array);
};
