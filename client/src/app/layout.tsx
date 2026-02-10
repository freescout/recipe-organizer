import { ReactNode } from "react";

import Header from "@/app/components/Header";
import "./globals.css";
import { inter } from "@/app/lib/fonts";

export const metadata = {
  title: "Tasty Tales",
  description: "Organize and discover recipes easily",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
