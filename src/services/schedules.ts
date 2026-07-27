import pb from '@/lib/pocketbase/client'

export interface DailyScheduleRecord {
  id: string
  group: string
  day_number: number
  date?: string
  title: string
  description: string
  breakfast?: string
  lunch?: string
  dinner?: string
  reminders?: string[] | string
  created: string
  updated: string
}

export const getGroupSchedules = (groupId: string) =>
  pb.collection('daily_schedules').getFullList<DailyScheduleRecord>({
    filter: `group = "${groupId}"`,
    sort: 'day_number',
  })

export const createSchedule = (data: Partial<DailyScheduleRecord>) =>
  pb.collection('daily_schedules').create<DailyScheduleRecord>(data)

export const updateSchedule = (id: string, data: Partial<DailyScheduleRecord>) =>
  pb.collection('daily_schedules').update<DailyScheduleRecord>(id, data)

export const deleteSchedule = (id: string) => pb.collection('daily_schedules').delete(id)
