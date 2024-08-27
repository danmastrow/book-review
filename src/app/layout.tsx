import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book review",
  description: "A place to submit, review and discuss books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full">
      <body className={`h-full ${inter.className}`}>
        <div className="min-h-full">
          <Header />
          <div className="py-4">
            <main>
              <div className="mx-auto max-w-7xl px-4">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
