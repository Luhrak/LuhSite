import * as model from "./model.js";
import * as image from "../service/image.js";
import { render } from "../service/render.js";

export async function gallerySubmit(ctx) {
  // Read form data
  const form = await ctx.request.formData();
  const formData = Object.fromEntries(form.entries());

  // Validation
  const errors = {};
  if (!formData.title) errors.title = "Titel is required";
  if (!formData.date) errors.date = "Date is required";
  if (!formData.type) errors.type = "Type is required";
  const fileError = image.validateImage(formData.artfile);
  if (fileError) errors.artfile = fileError;

  if (Object.keys(errors).length > 0) {
    await galleryAddWithData(ctx, formData, errors);
  } else {
    const uploadResult = await image.uploadImage(formData.artfile, "gallery");

    // Validate if Upload worked
    if (!uploadResult) {
      errors.artfile = "Upload failed";
      await galleryAddWithData(ctx, formData, errors);
    }

    // Save to db
    const newEntry = model.add({
      title: formData.title,
      artfile: uploadResult, // Path as string
      alt: formData.alt,
      date: formData.date,
      type: formData.type,
      description: formData.description,
    });
    // Redirect to uploaded detailpage (ctx.body not needed for redirect)
    ctx.status = 303;
    ctx.headers.set("Location", `/gallery/${newEntry}`);
  }
  return ctx;
}

async function galleryAddWithData(ctx, formData, errors) {
  // no redirect or export cuz function calling this returns the context already
  const today = new Date().toISOString().split("T")[0];
  ctx.body = await render("gallery-add.html", ctx, {
    prefillDate: formData.date,
    formData: formData,
    formErrors: errors,
  });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
}

export async function galleryUpdate(ctx) {
  // Read form data
  const id = ctx.entryId;
  const existingArt = model.get(id);
  const form = await ctx.request.formData();
  const formData = Object.fromEntries(form.entries());

  // Validation
  const errors = {};
  if (!formData.title) errors.title = "Titel is required";
  if (!formData.date) errors.date = "Date is required";
  if (!formData.type) errors.type = "Type is required";

  // image replacing is optional so only check if given
  if (formData.artfile) {
    const fileError = image.validateImage(formData.artfile);
    if (fileError !== undefined) errors.artfile = fileError;
  }

  if (Object.keys(errors).length > 0) {
    await galleryEditWithData(ctx, formData, errors);
  } else {
    // Handling if a new file was uploaded
    if (formData.artfile) {
      const uploadResult = await image.uploadImage(formData.artfile, "gallery");

      // Validate if Upload worked
      if (!uploadResult) {
        errors.artfile = "Upload failed";
        await galleryEditWithData(ctx, formData, errors);
      } else {
        formData.artfile = uploadResult;
        // TODO: DELETE
      }
    } else {
      // or take the old one
      formData.artfile = existingArt.artfile;
    }

    // Update in db
    const unpdatedEntry = model.update(id, formData);

    // Redirect to uploaded detailpage (ctx.body not needed for redirect)
    ctx.session.flash = 'Artpost "' + formData.title + '" has been updated';
    ctx.status = 303;
    ctx.headers.set("Location", `/gallery/${unpdatedEntry}`);
  }
  return ctx;
}

async function galleryEditWithData(ctx, formData, errors) {
  // no redirect or export cuz function calling this returns the context already
  const today = new Date().toISOString().split("T")[0];

  // Replace any missing data from previous state
  const id = ctx.entryId;
  const art = model.get(id);
  formData.id = art.id;
  formData.artfile = art.artfile;
  if ("title" in errors) formData.title = art.title;
  if ("type" in errors) formData.type = art.type;

  ctx.body = await render("gallery-add.html", ctx, {
    editing: "Edit Art",
    prefillDate: formData.date,
    formData: formData,
    formErrors: errors,
  });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
}

export function galleryDelete(ctx) {
  const id = ctx.entryId;
  const art = model.get(id);
  image.deleteImage(art.artfile);
  model.remove(id);

  ctx.session.flash = 'Artpost "' + art.title + '" has been deleted';
  ctx.status = 303;
  ctx.headers.set("Location", `/gallery`);
  return ctx;
}
