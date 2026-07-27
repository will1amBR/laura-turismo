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
  return `https://img.usecurling.com/p/800/600?q=chile%20landscape&color=blue`
}
