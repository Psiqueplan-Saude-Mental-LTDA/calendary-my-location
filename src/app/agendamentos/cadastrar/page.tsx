'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/providers/SnackbarProvider'
import Input from '@/components/Input'
import Button from '@/components/Button'

const formSchema = z.object({
  eventName: z.string().min(1, 'Informe o nome do evento'),
  description: z.string().min(1, 'Informe a descri\u00e7\u00e3o'),
  responsibleName: z.string().min(1, 'Informe o respons\u00e1vel'),
  responsiblePhone: z.string().min(1, 'Informe o telefone'),
  startDateTime: z.string().min(1, 'Informe a data de in\u00edcio'),
  endDateTime: z.string().min(1, 'Informe a data de t\u00e9rmino'),
  price: z.string().min(1, 'Informe o valor'),
})

type FormData = z.infer<typeof formSchema>

export default function CreateSchedulePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })
  const router = useRouter()
  const { showSnackbar } = useSnackbar()

  async function onSubmit(data: FormData) {
    try {
      const res = await axios.post('/api/schedules', data)
      showSnackbar(res.data.message, 'success')
      router.push('/agendamentos')
    } catch (err: any) {
      const message = err.response?.data?.error || 'Erro ao cadastrar'
      showSnackbar(message, 'error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 max-w-md mx-auto space-y-4"
    >
      <div>
        <Input {...register('eventName')} placeholder="Nome do evento" />
        {errors.eventName && (
          <p className="text-red-500 text-sm">{errors.eventName.message}</p>
        )}
      </div>
      <div>
        <textarea
          {...register('description')}
          placeholder="Descri\u00e7\u00e3o"
          className="border rounded w-full p-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <Input {...register('responsibleName')} placeholder="Responsável" />
        {errors.responsibleName && (
          <p className="text-red-500 text-sm">{errors.responsibleName.message}</p>
        )}
      </div>
      <div>
        <Input {...register('responsiblePhone')} placeholder="Telefone" />
        {errors.responsiblePhone && (
          <p className="text-red-500 text-sm">{errors.responsiblePhone.message}</p>
        )}
      </div>
      <div>
        <Input type="datetime-local" {...register('startDateTime')} />
        {errors.startDateTime && (
          <p className="text-red-500 text-sm">{errors.startDateTime.message}</p>
        )}
      </div>
      <div>
        <Input type="datetime-local" {...register('endDateTime')} />
        {errors.endDateTime && (
          <p className="text-red-500 text-sm">{errors.endDateTime.message}</p>
        )}
      </div>
      <div>
        <Input {...register('price')} placeholder="Valor" />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  )
}
