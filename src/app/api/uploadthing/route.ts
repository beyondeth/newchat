// import { NextRequest, NextResponse } from "next/server";
// import { createRouteHandler } from "uploadthing/server";
// import { fileRouter } from "./core";

// export const { GET, POST } = createRouteHandler({
//   router: fileRouter,
// });

// export const runtime = "nodejs";

import type { NextRequest } from "next/server";
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const handler = createRouteHandler({
  router: ourFileRouter,
});

// export const { GET, POST } = createRouteHandler({
//   router: ourFileRouter,
// });

export const GET = (request: NextRequest) => handler.GET(request);
export const POST = (request: NextRequest) => handler.POST(request);

// export const config = {
//   runtime: "edge",
// };

// export const runtime = "edge";

// import { NextRequest } from "next/server";
// import { createRouteHandler } from "uploadthing/server";
// import { fileRouter } from "./core";

// export async function GET(request: NextRequest) {
//   createRouteHandler({
//     router: fileRouter,
//   });
// }

// export async function POST(request: NextRequest) {
//   createRouteHandler({
//     router: fileRouter,
//   });
// }

// export const config = {
//   runtime: "edge",
// };
