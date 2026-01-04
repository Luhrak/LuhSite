import Context from "./framework/context.js";
import { router } from "./router.js";
import { serveStatic } from "./framework/middleware/serveStatic.js";
import { error500 } from "./framework/middleware/error500.js";

export const handleRequest = async (request) => {
  try {
    let ctx = new Context(request);
    ctx = await router(ctx);
    ctx = await serveStatic(ctx);
    return ctx.extractResponse();
  } catch {
    // In case that anything above went wrong
    return error500();
  }
};
