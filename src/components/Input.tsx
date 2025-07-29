'use client'
import { forwardRef, InputHTMLAttributes } from 'react'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className = '', ...props }, ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`border rounded w-full p-2 ${className}`}
    />
  )
})

export default Input
