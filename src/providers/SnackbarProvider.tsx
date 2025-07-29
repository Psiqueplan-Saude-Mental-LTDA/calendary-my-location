'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type SnackbarType = 'success' | 'error' | 'warning'

interface SnackbarState {
  open: boolean
  message: string
  type: SnackbarType
}

interface SnackbarContextProps {
  showSnackbar: (message: string, type?: SnackbarType) => void
}

const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: () => {},
})

export function useSnackbar() {
  return useContext(SnackbarContext)
}

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    type: 'success',
  })

  const showSnackbar = (message: string, type: SnackbarType = 'success') => {
    setSnackbar({ open: true, message, type })
    setTimeout(() => {
      setSnackbar(s => ({ ...s, open: false }))
    }, 3000)
  }

  const bgColor =
    snackbar.type === 'success'
      ? 'bg-green-500'
      : snackbar.type === 'error'
      ? 'bg-red-500'
      : 'bg-yellow-500'

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <div
          className={
            bgColor +
            ' fixed bottom-4 left-1/2 -translate-x-1/2 text-white px-4 py-2 rounded shadow'
          }
        >
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  )
}
