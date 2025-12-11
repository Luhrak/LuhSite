import * as pages from "./pages/controller.js";

export const router = async (ctx) => {
  // Main Pages
  const patIndex = new URLPattern({
    pathname: "/",
  });
  const patGallery = new URLPattern({
    pathname: "/gallery",
  });
  const patPrices = new URLPattern({
    pathname: "/prices",
  });
  const patProjects = new URLPattern({
    pathname: "/projects",
  });
  const patAbout = new URLPattern({
    pathname: "/about",
  });

  // Legal
  const patImpressum = new URLPattern({
    pathname: "/legal/impressum",
  });
  const patPrivacyPolicy = new URLPattern({
    pathname: "/legal/privacy-policy",
  });

  // Detail Pages
  const patArtRaimond = new URLPattern({
    pathname: "/detailpage/art-raimond",
  });
  const patArtStargaze = new URLPattern({
    pathname: "/detailpage/art-stargaze",
  });
  const patPriceHeadshot = new URLPattern({
    pathname: "/detailpage/price-headshot",
  });
  const patPriceSticker = new URLPattern({
    pathname: "/detailpage/price-sticker",
  });
  const patProjectFursuit = new URLPattern({
    pathname: "/detailpage/project-fursuit",
  });
  const patProjectStickers = new URLPattern({
    pathname: "/detailpage/project-stickers",
  });

  // Main Pages
  if (ctx.method == "GET" && patIndex.test(ctx.url)) {
    return pages.index(ctx);
  }
  if (ctx.method == "GET" && patGallery.test(ctx.url)) {
    return pages.gallery(ctx);
  }
  if (ctx.method == "GET" && patPrices.test(ctx.url)) {
    return pages.prices(ctx);
  }
  if (ctx.method == "GET" && patProjects.test(ctx.url)) {
    return pages.projects(ctx);
  }
  if (ctx.method == "GET" && patAbout.test(ctx.url)) {
    return pages.about(ctx);
  }

  // Legal
  if (ctx.method == "GET" && patImpressum.test(ctx.url)) {
    return pages.impressum(ctx);
  }
  if (ctx.method == "GET" && patPrivacyPolicy.test(ctx.url)) {
    return pages.privacyPolicy(ctx);
  }

  // Detail Pages
  if (ctx.method == "GET" && patArtRaimond.test(ctx.url)) {
    return pages.artRaimond(ctx);
  }
  if (ctx.method == "GET" && patArtStargaze.test(ctx.url)) {
    return pages.artStargaze(ctx);
  }
  if (ctx.method == "GET" && patPriceHeadshot.test(ctx.url)) {
    return pages.priceHeadshot(ctx);
  }
  if (ctx.method == "GET" && patPriceSticker.test(ctx.url)) {
    return pages.priceSticker(ctx);
  }
  if (ctx.method == "GET" && patProjectFursuit.test(ctx.url)) {
    return pages.projectFursuit(ctx);
  }
  if (ctx.method == "GET" && patProjectStickers.test(ctx.url)) {
    return pages.projectStickers(ctx);
  }

  return ctx;
};
