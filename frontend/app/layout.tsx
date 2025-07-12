import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainHeader } from "@/components/main-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReWear - Sustainable Clothing Exchange",
  description:
    "Exchange unused clothing through direct swaps or a point-based redemption system to promote sustainable fashion and reduce textile waste.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  )
}
