import * as pages from "../controller/pages.js";

export const error = async (ctx) => {
  if (ctx.status) {
    return ctx;
  }
  return pages.error404(ctx);
};
