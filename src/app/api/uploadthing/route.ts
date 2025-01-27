import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const handler = createRouteHandler({
  router: ourFileRouter,
});

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
