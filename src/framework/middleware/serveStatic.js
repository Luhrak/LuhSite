import { serveDir } from "jsr:@std/http";
import * as path from "jsr:@std/path";

export const serveStatic = async (ctx) => {
   try {
  
  
  if (ctx.status !== 404) {
    return ctx;
  } else if (path.extname(ctx.url.pathname)) {
    const res = await serveDir(ctx.request, {
      fsRoot: "./public",
      quiet: true,
      showDirListing: false,
      showDotfiles: false,
      showIndex: false,
    });
    if (res.status !== 404) {
      ctx.body = res.body;
      ctx.headers = res.headers;
      ctx.status = res.status;
    }
  }
  return ctx;
}
 catch (err) {
     try {
 const html = await Deno.readTextFile("./src/templates/error500.html");

      ctx.status = 500;
      ctx.headers.set("Content-Type", "text/html; charset=utf-8");
      ctx.body = html;
    } catch {
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
    return ctx;
  }

  
};
