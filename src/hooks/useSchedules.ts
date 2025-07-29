import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Schedule } from '@/app/api/schedules/get.type'

async function fetchSchedules() {
  const { data } = await axios.get<Schedule[]>('/api/schedules')
  return data
}

export function useSchedules() {
  return useQuery(['schedules'], fetchSchedules)
}
