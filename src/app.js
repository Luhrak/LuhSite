import Context from "./framework/context.js";
import { router } from "./router.js";
import { serveStatic } from "./middleware/serveStatic.js";
import { error } from "./middleware/errors.js";

export const handleRequest = async (request) => {
  let ctx = new Context(request);
  ctx = await router(ctx);
  ctx = await serveStatic(ctx);
  ctx = await error(ctx);
  return ctx.extractResponse();
};
