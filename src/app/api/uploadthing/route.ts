// import { NextRequest, NextResponse } from "next/server";
import { createRouteHandler } from "uploadthing/server";
import { fileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});

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
