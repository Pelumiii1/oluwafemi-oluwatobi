import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hey, Femi's here! | Oluwatobi Oluwafemi — Product Designer",
  description:
    "From idea to shipped, without the mess. Oluwafemi is a Product Designer combining research, systems thinking, and AI-powered workflows to design intelligent digital products.",
  keywords: [
    "Product Designer",
    "UI/UX Designer",
    "Design Systems",
    "AI Products",
    "Fintech",
    "Oluwafemi",
    "Oluwatobi Oluwafemi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
