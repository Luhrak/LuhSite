import * as path from "jsr:@std/path";

export const error500 = async () => {
  const filepath = path.join(Deno.cwd(), "./templates/error500.html");
  const header = new Headers();
  header.set("content-type", "text/html");
  return new Response(await Deno.readTextFile(filepath), {
    status: 200,
    headers: header,
  });
};
