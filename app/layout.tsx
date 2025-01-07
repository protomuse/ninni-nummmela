import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Ninni Nummela - Makeup Artist & Creative Consultant',
  description: 'Contact Ninni Nummela for makeup artistry and creative consultations.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased min-h-screen bg-background`}>
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}

