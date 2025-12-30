import * as pages from "./controller/pages.js";
import * as gallery from "./controller/gallery.js";

const routes = [
  // Main pages
  {
    path: "/",
    method: "GET",
    handler: pages.index,
  },
  {
    path: "/prices",
    method: "GET",
    handler: pages.prices,
  },
  {
    path: "/projects",
    method: "GET",
    handler: pages.projects,
  },
  {
    path: "/about",
    method: "GET",
    handler: pages.about,
  },

  // Gallery (specific ones before general id!)
  {
    path: "/gallery",
    method: "GET",
    handler: gallery.gallery,
  },
  {
    path: "/gallery/add",
    method: "GET",
    handler: gallery.addArtForm,
  },
  {
    path: "/gallery/add",
    method: "POST",
    handler: gallery.submitArtForm,
  },
  {
    path: "/gallery/:id",
    method: "GET",
    handler: gallery.artPiece,
  },
  {
    path: "/gallery-delete/:id",
    method: "POST",
    handler: gallery.deleteArtPiece,
  },

  // Legal pages
  {
    path: "/legal/impressum",
    method: "GET",
    handler: pages.impressum,
  },
  {
    path: "/legal/privacy-policy",
    method: "GET",
    handler: pages.privacyPolicy,
  },

  // Static Detailpages > Becomes project pages
  {
    path: "/detailpage/price-headshot", // Remove eventually
    method: "GET",
    handler: pages.priceHeadshot,
  },
  {
    path: "/detailpage/price-sticker", // Remove eventually
    method: "GET",
    handler: pages.priceSticker,
  },
  {
    path: "/detailpage/project-fursuit",
    method: "GET",
    handler: pages.projectFursuit,
  },
  {
    path: "/detailpage/project-stickers",
    method: "GET",
    handler: pages.projectStickers,
  },
];

export const router = async (ctx) => {
  // Match requests with known pages
  for (const route of routes) {
    const urlPattern = new URLPattern({ pathname: route.path });
    const match = urlPattern.exec(ctx.url);

    if (ctx.method === route.method && match) {
      ctx.entryId = match.pathname.groups.id; // for detailpages
      return route.handler(ctx);
    }
  }
  return pages.error404(ctx);
};
