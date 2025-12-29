import { add } from "../gallery/model.js";
import { render } from "../service/render.js";

export async function addArt(ctx) {
  const today = new Date().toISOString().split("T")[0];
  ctx.body = render("gallery-add.html", {
    prefillDate: today,
    formData: {},
    formErrors: {},
  });
  ctx.headers.set("content-type", "text/html; charset=utf-8");
  ctx.status = 200;
  return ctx;
}

export async function createArt(ctx) {
  // Read form data
  const form = await ctx.request.formData();
  const formData = Object.fromEntries(form.entries());

  // Validation
  const errors = {};
  if (!formData.title) errors.title = "Titel is required";
  if (!formData.artfile) errors.artfile = "Art file is required";
  if (!formData.date) errors.date = "Date is required";
  if (!formData.type) errors.type = "Type is required";

  if (Object.keys(errors).length > 0) {
    // Show user input errors
    const today = new Date().toISOString().split("T")[0];
    ctx.status = 400;
    ctx.headers.set("content-type", "text/html; charset=utf-8");
    ctx.body = render("gallery-add.html", {
      prefillDate: formData.date,
      formData,
      formErrors: errors,
    });
  } else {
    // Save to db and redirect to new detailpage
    const newNote = add({
      title: formData.title,
      artfile: formData.artfile, // TODO: img saving into gallery and putting the path
      alt: formData.alt,
      date: formData.date,
      type: formData.type,
      description: formData.description,
    });
    ctx.status = 303;
    ctx.headers.set("Location", `/note/${newNote}`);
    // ctx.body not needed for redirect
  }
  return ctx;
}
