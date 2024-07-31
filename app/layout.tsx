import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LiveblocksProvider } from "@/lib/providers/liveblocks-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <LiveblocksProvider>
        <body className={inter.className}>{children}</body>
      </LiveblocksProvider>
    </html>
  );
}
