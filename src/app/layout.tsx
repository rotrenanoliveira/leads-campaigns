import { Toaster } from 'sonner'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={spaceGrotesk.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
