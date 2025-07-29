'use client'
import { forwardRef, ButtonHTMLAttributes } from 'react'

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function Button(
  { className = '', ...props }, ref
) {
  return (
    <button
      ref={ref}
      {...props}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    />
  )
})

export default Button
