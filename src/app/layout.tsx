import './globals.css'
import { ReactNode } from 'react'
import QueryProvider from '@/providers/QueryProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
