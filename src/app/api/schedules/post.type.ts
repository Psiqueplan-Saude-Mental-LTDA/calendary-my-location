import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  startDateTime: z.string(),
  endDateTime: z.string(),
  eventName: z.string(),
  responsibleName: z.string(),
  responsiblePhone: z.string(),
  description: z.string(),
  price: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = bodySchema.parse(body)

    const schedule = await prisma.eventSchedule.create({
      data: {
        startDateTime: new Date(data.startDateTime),
        endDateTime: new Date(data.endDateTime),
        eventName: data.eventName,
        responsibleName: data.responsibleName,
        responsiblePhone: data.responsiblePhone,
        description: data.description,
        price: parseFloat(data.price),
      },
    })

    return NextResponse.json({ message: 'Agendamento criado com sucesso', id: schedule.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inv\u00e1lidos' }, { status: 400 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Falha ao criar agendamento' }, { status: 500 })
  }
}
