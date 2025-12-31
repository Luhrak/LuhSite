import { add, get, del, listVisualOnly } from "../gallery/model.js";
import { render } from "../service/render.js";
import { validateImage, uploadImage } from "../service/image.js";

export const gallery = async (ctx) => {
  const gallery = listVisualOnly();
  ctx.body = await render("gallery.html", { gallery });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const artPiece = async (ctx) => {
  const id = ctx.entryId;
  const art = await get(id);
  ctx.body = await render("gallery-detailpage.html", { art });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export const deleteArtPiece = async (ctx) => {
  const id = ctx.entryId;
  del(id);
  ctx.status = 303;
  ctx.headers.set("Location", `/gallery`);
  return ctx;
};

export const galleryAdd = async (ctx) => {
  ctx.body = await render("gallery-add.html");
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
};

export async function addArtForm(ctx) {
  const today = new Date().toISOString().split("T")[0];
  ctx.body = render("gallery-add.html", {
    prefillDate: today,
    formData: {},
    formErrors: {},
  });
  ctx.headers.set("content-type", "text/html");
  ctx.status = 200;
  return ctx;
}

function addArtFormData(ctx, formData, errors) {
  const today = new Date().toISOString().split("T")[0];
  ctx.body = render("gallery-add.html", {
    prefillDate: formData.date,
    formData: formData,
    formErrors: errors,
  });
  console.log(formData),
  ctx.headers.set("content-type", "text/html");
  ctx.status = 400;
}

export async function submitArtForm(ctx) {
  // Read form data
  const form = await ctx.request.formData();
  const formData = Object.fromEntries(form.entries());

  // Validation
  const errors = {};
  if (!formData.title) errors.title = "Titel is required";
  if (!formData.date) errors.date = "Date is required";
  if (!formData.type) errors.type = "Type is required";
  const fileError = validateImage(formData.artfile);
  if (fileError) errors.artfile = fileError;

  if (Object.keys(errors).length > 0) {
    addArtFormData(ctx, formData, errors);
  } else {
    const uploadResult = await uploadImage(formData.artfile);

    // Validate Upload
    if (!uploadResult) {
      errors.artfile = "Upload failed";
      addArtFormData(ctx, formData, errors);
    }

    // Save to db
    const newEntry = add({
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
