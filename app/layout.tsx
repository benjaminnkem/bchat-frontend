import type { Metadata } from "next";
import "../public/globals.css";
import { mulish } from "@/lib/utils/fonts";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: "ToChat",
  description: "ToChat is a chat application built for students to communicate with each other.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
