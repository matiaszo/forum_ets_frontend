import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import { Header } from "@/components/header";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "400", "900"],
  style: "italic",
  variable: "--roboto",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Titulo",
  description: "Descrição",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased min-h-screen`}
      >
        <Header/>
        <main>{children}</main>
        
      </body>
    </html>
  );
}
