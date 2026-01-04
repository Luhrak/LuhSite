
 /* import {error500 as error} from "../../controller/pages.js";
export const error500 = async (ctx) => { 

if (ctx.body instanceof Error ) {


    ctx = await error(ctx);
    }
    return ctx;
  }
 */

  export const error500 = async (ctx) => {
  if (ctx.status !== 500) return ctx;

  try {
    const html = await Deno.readTextFile("./templates/500.html");
    ctx.headers.set("content-type", "text/html; charset=utf-8");
    ctx.body = html;
  } catch {
    ctx.body = "Internal Server Error";
  }

  return ctx;
};