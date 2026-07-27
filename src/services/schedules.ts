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
  photo?: string
  created: string
  updated: string
}

export const getSchedulePhotoUrl = (record: DailyScheduleRecord) => {
  if (record.photo) {
    return pb.files.getURL(record as any, record.photo)
  }
  return null
}

export const uploadSchedulePhoto = (id: string, file: File) => {
  const formData = new FormData()
  formData.append('photo', file)
  return pb.collection('daily_schedules').update<DailyScheduleRecord>(id, formData)
}

export const createScheduleWithPhoto = (
  data: Partial<DailyScheduleRecord>,
  photo?: File | null,
) => {
  if (photo) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })
    formData.append('photo', photo)
    return pb.collection('daily_schedules').create<DailyScheduleRecord>(formData)
  }
  return pb.collection('daily_schedules').create<DailyScheduleRecord>(data)
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
