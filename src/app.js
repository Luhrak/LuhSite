import { router } from "./router.js";
import { servePublic } from "./middleware/servePublic.js";
import Context from "./framework/context.js";

export const handleRequest = async (request) => {
  let ctx = new Context(request);
  ctx = await router(ctx);
  ctx = await servePublic(ctx);
  return ctx.extractResponse();
};

// deno run --allow-net --allow-read --watch server.js

const routes = {
  "/": "index.html",
  "/gallery": "gallery.html",
  "/prices": "prices.html",
  "/projects": "projects.html",
  "/about": "about.html",
  "/detailpage/art-stargaze": "/detailpage/art-stargaze.html",
  "/detailpage/art-raimond": "/detailpage/art-raimond.html",

  "/legal/impressum": "/legal/impressum.html",
  "/legal/privacy-policy": "/legal/privacy-policy.html",

  "/detailpage/price-headshot": "/detailpage/price-headshot.html",
  "/detailpage/price-sticker": "/detailpage/price-sticker.html",

  "/detailpage/project-fursuit": "/detailpage/project-fursuit.html",
  "/detailpage/project-stickers": "/detailpage/project-stickers.html",
};

export const handleRequestOwn = async (request) => {
  const url = new URL(request.url);

  if (request.method === "GET") {
    const template = routes[url.pathname]; // Check if theres matching template
    if (template) {
      const body = await render(template);
      return new Response(body, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }

  // Else 404
  return new Response("404 - Not found", { status: 404 });
};
