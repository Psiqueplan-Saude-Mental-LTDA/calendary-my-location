import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.eventSchedule.findMany({
      orderBy: { startDateTime: 'asc' },
    })

    const formatPrice = (value: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    const result = events.map(event => ({
      id: event.id,
      startDateTime: event.startDateTime.toLocaleString('pt-BR'),
      endDateTime: event.endDateTime.toLocaleString('pt-BR'),
      eventName: event.eventName,
      responsibleName: event.responsibleName,
      responsiblePhone: event.responsiblePhone,
      description: event.description,
      price: formatPrice(event.price),
    }))

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar agendamentos' }, { status: 500 })
  }
}
