import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PREDIM TECH",
  description: "We specialize in delivering top-tier IT services centered around Siemens Teamcenter PLM software.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <LoadingScreen />
          <Header />
          <main className="page-content">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'