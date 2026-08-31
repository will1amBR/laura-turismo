import pb from '@/lib/pocketbase/client'

export interface PackageRecord {
  id: string
  title: string
  description: string
  duration_days: number
  price_cents: number
  cover_image?: string
  created: string
  updated: string
}

export const getPackages = () =>
  pb.collection('packages').getFullList<PackageRecord>({ sort: '-created' })
export const getPackage = (id: string) => pb.collection('packages').getOne<PackageRecord>(id)
export const createPackage = (data: Partial<PackageRecord>) =>
  pb.collection('packages').create<PackageRecord>(data)
export const updatePackage = (id: string, data: Partial<PackageRecord>) =>
  pb.collection('packages').update<PackageRecord>(id, data)
export const deletePackage = (id: string) => pb.collection('packages').delete(id)
export const getPackageImageUrl = (record: PackageRecord) => {
  if (record.cover_image) {
    return pb.files.getURL(record, record.cover_image)
  }
  const title = (record.title || '').toLowerCase()
  if (
    title.includes('neve') ||
    title.includes('esqui') ||
    title.includes('valle nevado') ||
    title.includes('portillo')
  ) {
    return 'https://img.usecurling.com/p/1200/800?q=valle%20nevado%20ski'
  }
  if (
    title.includes('vinhedos') ||
    title.includes('vinho') ||
    title.includes('vinícola') ||
    title.includes('concha y toro') ||
    title.includes('maipo') ||
    title.includes('casablanca')
  ) {
    return 'https://img.usecurling.com/p/1200/800?q=chile%20vineyard%20wine'
  }
  if (
    title.includes('patagonia') ||
    title.includes('patagônia') ||
    title.includes('torres del paine')
  ) {
    return 'https://img.usecurling.com/p/1200/800?q=torres%20del%20paine'
  }
  if (title.includes('atacama') || title.includes('aventura')) {
    return 'https://img.usecurling.com/p/1200/800?q=atacama%20desert%20chile'
  }
  // Default Santiago / Chile Andes
  return 'https://img.usecurling.com/p/1200/800?q=santiago%20chile%20andes'
}
