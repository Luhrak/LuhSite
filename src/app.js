import Context from "./framework/context.js";
import { router } from "./router.js";
import { serveStatic } from "./framework/middleware/serveStatic.js";
import { error500 } from "./framework/middleware/error500.js";

export const handleRequest = async (request) => {
  let ctx = new Context(request);
  ctx = await router(ctx);
  ctx = await serveStatic(ctx);
  ctx = await error500(ctx);
  return ctx.extractResponse();
};
