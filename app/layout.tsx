import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "ScaleCraft | Digital Agency That Helps Small Businesses Grow Online",
  description: "We build websites and apps that bring customers to your business. Website development, e-commerce, SEO, and automation for small businesses.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
