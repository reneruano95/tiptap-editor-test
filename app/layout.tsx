import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { LiveblocksProvider } from "@/lib/providers/liveblocks-providers";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TipTap Editor with Liveblocks and Next.js Starter",
  description:
    "A starter template for building a collaborative editor with TipTap, Liveblocks, and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LiveblocksProvider>
          {children}
          <Toaster />
        </LiveblocksProvider>
      </body>
    </html>
  );
}
