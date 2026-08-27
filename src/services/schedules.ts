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
  photo?: string | string[]
  created: string
  updated: string
}

export const getSchedulePhotoUrls = (record: DailyScheduleRecord): string[] => {
  if (!record.photo) return []
  if (Array.isArray(record.photo)) {
    return record.photo.map((p) => pb.files.getURL(record as any, p))
  }
  if (typeof record.photo === 'string' && record.photo.trim().length > 0) {
    return [pb.files.getURL(record as any, record.photo)]
  }
  return []
}

export const getSchedulePhotoUrl = (record: DailyScheduleRecord) => {
  const urls = getSchedulePhotoUrls(record)
  return urls.length > 0 ? urls[0] : null
}

export const uploadSchedulePhotos = (id: string, files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('photo', file)
  })
  return pb.collection('daily_schedules').update<DailyScheduleRecord>(id, formData)
}

export const uploadSchedulePhoto = (id: string, file: File) => {
  return uploadSchedulePhotos(id, [file])
}

export const createScheduleWithPhoto = (
  data: Partial<DailyScheduleRecord>,
  photos?: File | File[] | null,
) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })

  if (photos) {
    if (Array.isArray(photos)) {
      photos.forEach((f) => formData.append('photo', f))
    } else {
      formData.append('photo', photos)
    }
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
