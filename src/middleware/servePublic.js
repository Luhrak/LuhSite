import { serveDir } from "jsr:@std/http";
import * as path from "jsr:@std/path";

export const servePublic = async (ctx) => {
  if (ctx.status) {
    return ctx;
  }
  if (path.extname(ctx.url.pathname)) {
    /* This handels range requests etc */
    const res = await serveDir(ctx.request, {
      fsRoot: "./public",
      quiet: true,
      showDirListing: false,
      showDotfiles: false,
      showIndex: false,
      headers: ctx.headers, // Merge headers, if any.
    });
    if (res.status !== 404) {
      ctx.body = res.body;
      ctx.headers = res.headers;
      ctx.status = res.status;
    }
  }
  return ctx;
};
