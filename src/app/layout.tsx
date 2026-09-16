import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cricket Rivals 3D",
  description: "Cricket Rivals 3D — a premium 3D cricket gaming experience.",
  applicationName: "Cricket Rivals 3D",
  keywords: [
    "Cricket Rivals 3D",
    "cricket game",
    "3D cricket",
    "cricket gaming",
    "sports game",
  ],
  authors: [{ name: "Cricket Rivals 3D" }],
  creator: "Cricket Rivals 3D",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
  themeColor: "#050806",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}