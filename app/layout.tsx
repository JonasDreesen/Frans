import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Frans Leren - Voor Vlamingen',
  description: 'Leer Frans zoals een Belg. Gepersonaliseerd op jouw niveau met focus op Belgisch Frans.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
