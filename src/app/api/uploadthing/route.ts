import { NextRequest, NextResponse } from "next/server";
import { createRouteHandler } from "uploadthing/server";
import { fileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});

export const runtime = "edge";

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

// import { createRouteHandler } from "uploadthing/server";
// import { fileRouter } from "./core";
