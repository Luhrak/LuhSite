import * as path from "jsr:@std/path";

export const render = async (file) =>
  await Deno.readTextFile(path.join("./templates", file));
