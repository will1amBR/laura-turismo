import pb from '@/lib/pocketbase/client'
import { PackageRecord } from './packages'

export interface GroupRecord {
  id: string
  package: string
  name: string
  start_date: string
  end_date: string
  capacity: number
  current_members: number
  status: 'em_formacao' | 'confirmado' | 'em_andamento' | 'finalizado'
  admin: string
  expand?: {
    package?: PackageRecord
    admin?: { id: string; name: string; email: string }
  }
  created: string
  updated: string
}

export const getGroups = () =>
  pb.collection('groups').getFullList<GroupRecord>({ expand: 'package,admin', sort: '-created' })
export const getGroup = (id: string) =>
  pb.collection('groups').getOne<GroupRecord>(id, { expand: 'package,admin' })
export const getPackageGroups = (packageId: string) =>
  pb.collection('groups').getFullList<GroupRecord>({
    filter: `package = "${packageId}"`,
    expand: 'package',
    sort: 'start_date',
  })
export const createGroup = (data: Partial<GroupRecord>) =>
  pb.collection('groups').create<GroupRecord>(data)
export const updateGroup = (id: string, data: Partial<GroupRecord>) =>
  pb.collection('groups').update<GroupRecord>(id, data)
export const deleteGroup = (id: string) => pb.collection('groups').delete(id)
