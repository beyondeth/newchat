import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | mebook",
    default: "mebook",
  },
  description: "책벌레들의 소통공간",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: "/mebook.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PostHogProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              // enableSystem
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Analytics />
              <SpeedInsights />
            </ThemeProvider>
          </ReactQueryProvider>
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
