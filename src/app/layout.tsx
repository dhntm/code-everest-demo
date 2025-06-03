import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bugs Bunny - Bug Tracker',
  description: 'Track and manage bugs efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-gray-50 ${inter.className}`}>
        {children}
      </body>
    </html>
  )
} 