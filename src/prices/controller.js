import * as model from "./model.js";
import * as image from "../service/image.js";
import { render } from "../service/render.js";

export const priceList = async (ctx) => {
  const prices = model.listVisualOnly();
  ctx.body = render("price.html", { prices });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx; // Remember to always return ctx, every function in this project gets context and returns context
  // That way ctx can get from server>app>router>controller> returned back to server
};

export const priceDetail = async (ctx) => {
  const price = model.get(ctx.entryId);
  ctx.body = render("price-detail.html", { price });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const addPriceForm = async (ctx) => {
  ctx.body = render("price-add.html", {
    editing: false,
    formData: {},
    formErrors: {},
  });
  ctx.status = 200;
  ctx.headers.set("content-type", "text/html");
  return ctx;
};

export const submitPriceForm = async (ctx) => {
  const form = await ctx.request.formData();
  const formData = Object.fromEntries(form.entries());

  // Für Datei: get file aus formData
  const file = form.get("artfile");

  const errors = {};
  if (!formData.title) errors.title = "Title is required";
  // I took out Data & Type as they are not needed
  const fileError = file ? image.validateImage(file) : null;
  if (fileError) errors.artfile = fileError;

  if (Object.keys(errors).length > 0) {
    ctx.body = render("price-add.html", {
      formData,
      formErrors: errors,
      editing: false,
    });
    ctx.status = 400;
    return ctx;
  }

  const uploadResult = file ? await image.uploadImage(file) : "";

  const id = model.add({
    artfile: uploadResult,
    title: formData.title,
    description: formData.description,
    additions: formData.additions,
  });

  ctx.status = 303;
  ctx.headers.set("Location", `/price/${id}`);
  return ctx;
};

export const deletePrice = async (ctx) => {
  const price = model.get(ctx.entryId);
  image.deleteImage(price.artfile);
  model.del(ctx.entryId);

  ctx.status = 303;
  ctx.headers.set("Location", "/price");
  return ctx;
};
