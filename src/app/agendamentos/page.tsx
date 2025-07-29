'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSchedules } from '@/hooks/useSchedules'
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'
import Input from '@/components/Input'

export default function AgendamentosPage() {
  const { data: schedules = [], isLoading, error } = useSchedules()
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

  const formattedDate = date ? date.split('-').reverse().join('/') : ''
  const filtered = schedules.filter(schedule => {
    const matchSearch =
      schedule.eventName.toLowerCase().includes(search.toLowerCase()) ||
      schedule.responsibleName.toLowerCase().includes(search.toLowerCase())
    const scheduleDate = schedule.startDateTime.split(',')[0]
    const matchDate = date ? scheduleDate === formattedDate : true
    return matchSearch && matchDate
  })

  if (isLoading) return <Loading />
  if (error) return <ErrorMessage message="Erro ao carregar agendamentos" />

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <Link href="/agendamentos/cadastrar" className="text-blue-500">Novo</Link>
      </div>
      <Input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4"
        placeholder="Buscar por evento ou responsável"
      />
      <Input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="mb-4"
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(schedule => (
          <div key={schedule.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold text-lg mb-2">{schedule.eventName}</h2>
            <p className="text-sm text-gray-600 mb-2">{schedule.description}</p>
            <p><strong>Responsável:</strong> {schedule.responsibleName}</p>
            <p><strong>Telefone:</strong> {schedule.responsiblePhone}</p>
            <p><strong>Início:</strong> {schedule.startDateTime}</p>
            <p><strong>Término:</strong> {schedule.endDateTime}</p>
            <p><strong>Valor:</strong> {schedule.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
