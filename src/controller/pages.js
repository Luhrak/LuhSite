import { listVisualOnly } from "../gallery/model.js";
import { render } from "../service/render.js";

// Main Pages
export const index = async (ctx) => {
  const gallery = listVisualOnly();
  ctx.body = await render("index.html", { gallery });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const prices = async (ctx) => {
  ctx.body = await render("prices.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const projects = async (ctx) => {
  ctx.body = await render("projects.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const about = async (ctx) => {
  ctx.body = await render("about.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

// Misc
export const impressum = async (ctx) => {
  ctx.body = await render("legal/impressum.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const privacyPolicy = async (ctx) => {
  ctx.body = await render("legal/privacy-policy.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const error404 = async (ctx) => {
  ctx.body = await render("error404.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 404;
  return ctx;
};

export const error500 = async (ctx) => {
  ctx.body = await render("error500.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 500;
  return ctx;
};

// Detail Pages
export const priceHeadshot = async (ctx) => {
  // Remove eventually
  ctx.body = await render("detailpage/price-headshot.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const priceSticker = async (ctx) => {
  // Remove eventually
  ctx.body = await render("detailpage/price-sticker.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const projectFursuit = async (ctx) => {
  ctx.body = await render("detailpage/project-fursuit.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const projectStickers = async (ctx) => {
  ctx.body = await render("detailpage/project-stickers.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};
