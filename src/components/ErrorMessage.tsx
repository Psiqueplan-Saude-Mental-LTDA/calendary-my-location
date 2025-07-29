'use client'

export default function ErrorMessage({ message }: { message: string }) {
  return <p className="p-4 text-red-500">{message}</p>
}
