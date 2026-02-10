// client/src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "./components/Header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
});

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
export { playfair };
