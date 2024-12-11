import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google"
import localFont from 'next/font/local'
import { Header } from "@/components/header";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: "italic",
  variable: "--roboto",
  subsets: ["latin"]
})

// const robotoCondensed = Roboto_Condensed({
//   weight: ["100", "300", "400","500", "700", "900"],
//   style: "italic",
//   variable: "--robotoCondensed",
//   subsets: ["latin"]
// })

export const metadata: Metadata = {
  title: "ETS Forum",
  description: "Descrição",
};

const robotoCondensed = localFont({
  src: "../../public/fonts/RobotoCondensed-VariableFont_wght.ttf", 
  weight: "100 200 300 400 500 700 800 900", 
  variable: '--font-roboto-condensed', 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoCondensed.className} antialiased h-fit`}
      >
        <main className={`${robotoCondensed.className}`}>{children}</main>
        
      </body>
    </html>
  );
}
