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

export const getScheduleDefaultPhotos = (titleStr: string, descStr: string): string[] => {
  const text = `${titleStr} ${descStr}`.toLowerCase()
  if (text.includes('esqui') || text.includes('valle nevado')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=valle%20nevado%20snow',
      'https://img.usecurling.com/p/1200/800?q=chile%20andes%20ski',
    ]
  }
  if (text.includes('portillo')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=portillo%20laguna%20inca',
      'https://img.usecurling.com/p/1200/800?q=andes%20snow%20mountain',
    ]
  }
  if (text.includes('concha y toro')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=concha%20y%20toro%20winery',
      'https://img.usecurling.com/p/1200/800?q=chile%20wine%20cellar',
    ]
  }
  if (text.includes('santa rita')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=santa%20rita%20winery',
      'https://img.usecurling.com/p/1200/800?q=maipo%20valley%20vineyard',
    ]
  }
  if (text.includes('matetic') || text.includes('casablanca')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=casablanca%20valley%20vineyard',
      'https://img.usecurling.com/p/1200/800?q=chile%20wine%20tasting',
    ]
  }
  if (
    text.includes('undurraga') ||
    text.includes('cousiño') ||
    text.includes('cousino') ||
    text.includes('vinícola') ||
    text.includes('vinicola')
  ) {
    return [
      'https://img.usecurling.com/p/1200/800?q=chile%20vineyard%20grapes',
      'https://img.usecurling.com/p/1200/800?q=wine%20barrel%20cellar',
    ]
  }
  if (text.includes('torres del paine') || text.includes('paine')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=torres%20del%20paine',
      'https://img.usecurling.com/p/1200/800?q=patagonia%20mountains%20lake',
    ]
  }
  if (text.includes('glaciar grey') || text.includes('lago grey') || text.includes('glaciar')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=glacier%20grey%20patagonia',
      'https://img.usecurling.com/p/1200/800?q=patagonia%20iceberg',
    ]
  }
  if (text.includes('punta arenas') || text.includes('magalhães') || text.includes('magalhaes')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=punta%20arenas%20chile',
      'https://img.usecurling.com/p/1200/800?q=straits%20of%20magellan',
    ]
  }
  if (text.includes('atacama') || text.includes('deserto')) {
    return [
      'https://img.usecurling.com/p/1200/800?q=atacama%20desert%20chile',
      'https://img.usecurling.com/p/1200/800?q=san%20pedro%20de%20atacama',
    ]
  }
  if (
    text.includes('san cristóbal') ||
    text.includes('san cristobal') ||
    text.includes('city tour') ||
    text.includes('moneda') ||
    text.includes('santiago')
  ) {
    return [
      'https://img.usecurling.com/p/1200/800?q=santiago%20chile%20cerro',
      'https://img.usecurling.com/p/1200/800?q=santiago%20city%20andes',
    ]
  }
  return ['https://img.usecurling.com/p/1200/800?q=chile%20landscape%20travel']
}

export const getSchedulePhotoUrls = (record: DailyScheduleRecord): string[] => {
  if (record.photo) {
    if (Array.isArray(record.photo) && record.photo.length > 0) {
      return record.photo.map((p) => pb.files.getURL(record as any, p))
    }
    if (typeof record.photo === 'string' && record.photo.trim().length > 0) {
      return [pb.files.getURL(record as any, record.photo)]
    }
  }
  return getScheduleDefaultPhotos(record.title || '', record.description || '')
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
