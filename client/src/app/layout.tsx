import "./globals.css";

export const metadata = {
  title: "Tasty Talesr",
  description: "Organize and discover recipes easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
