import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oluwafemi | Product Designer — Portfolio Coming Soon",
  description:
    "Oluwafemi Oluwatobi is a product designer. Portfolio is currently being designed — come back soon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
