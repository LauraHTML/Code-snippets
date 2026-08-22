import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Toaster } from "@/src/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeDb",
  description: "Plataforma para salvar trechos de códigos",
  metadataBase: new URL('https://front-end-vh8m.onrender.com'),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`bg-[url(/img/fundoAuth.png)] flex items-center justify-center ${geistSans.variable} ${geistMono.variable} antialiased h-auto min-h-screen`}
      >
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>

      </body>
    </html>
  );
}
