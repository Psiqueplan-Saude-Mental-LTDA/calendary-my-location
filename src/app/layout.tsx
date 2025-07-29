import './globals.css'
import { ReactNode } from 'react'
import QueryProvider from '@/providers/QueryProvider'
import SnackbarProvider from '@/providers/SnackbarProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <QueryProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
