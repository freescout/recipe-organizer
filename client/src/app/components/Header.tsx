import Link from "next/link";
import { playfair } from "@/app/lib/fonts";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1
            className={`${playfair.className} text-2xl md:text-3xl font-semibold text-gray-900`}
          >
            Tasty Tales
          </h1>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 text-sm font-medium rounded-full
             border border-gray-300 text-gray-900
             hover:bg-gray-100 transition-colors"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
