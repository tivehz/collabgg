import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Collab - Plataforma de Skins NFT",
  description: "Plataforma de Skins inspiradas em CS com gamificação, badges e conquistas",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collab.PNG-UIwgOLq9Uadv8fRbSeKvP9C4aSES15.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collab.PNG-UIwgOLq9Uadv8fRbSeKvP9C4aSES15.png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>{children}</body>
    </html>
  )
}



import './globals.css'