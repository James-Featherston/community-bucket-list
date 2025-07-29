import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers";

export const metadata: Metadata = {
  title: "Bucketlist",
  description: "Track and share your goals with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen">
        <AppProviders>
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
