import pb from '@/lib/pocketbase/client'
import { GroupRecord } from './groups'

export interface GroupMemberRecord {
  id: string
  group: string
  user: string
  status: 'pendente' | 'aprovado' | 'recusado'
  payment_status: 'pendente' | 'pago'
  expand?: {
    group?: GroupRecord
    user?: { id: string; name: string; email: string; avatar?: string }
  }
  created: string
  updated: string
}

export const getGroupMembers = (groupId: string) =>
  pb.collection('group_members').getFullList<GroupMemberRecord>({
    filter: `group = "${groupId}"`,
    expand: 'user',
  })

export const getUserMemberships = (userId: string) =>
  pb.collection('group_members').getFullList<GroupMemberRecord>({
    filter: `user = "${userId}"`,
    expand: 'group,group.package',
  })

export const joinGroup = async (
  groupId: string,
  userId: string,
  paymentStatus: 'pendente' | 'pago' = 'pago',
) => {
  return pb.collection('group_members').create<GroupMemberRecord>({
    group: groupId,
    user: userId,
    status: 'pendente',
    payment_status: paymentStatus,
  })
}

export const updateMemberStatus = (id: string, status: 'aprovado' | 'recusado') =>
  pb.collection('group_members').update<GroupMemberRecord>(id, { status })

export const deleteMember = (id: string) => pb.collection('group_members').delete(id)
