import "./globals.css";

export const metadata = {
  title: "Recipe Organizer",
  description: "Organize and discover recipes easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
