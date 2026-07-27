import pb from '@/lib/pocketbase/client'

export interface ChecklistItemRecord {
  id: string
  group: string
  item: string
  is_required: boolean
  order: number
  created: string
  updated: string
}

export const getChecklistItems = (groupId: string) =>
  pb.collection('trip_checklist_items').getFullList<ChecklistItemRecord>({
    filter: `group = "${groupId}"`,
    sort: 'order',
  })

export const createChecklistItem = (data: Partial<ChecklistItemRecord>) =>
  pb.collection('trip_checklist_items').create<ChecklistItemRecord>(data)

export const updateChecklistItem = (id: string, data: Partial<ChecklistItemRecord>) =>
  pb.collection('trip_checklist_items').update<ChecklistItemRecord>(id, data)

export const deleteChecklistItem = (id: string) => pb.collection('trip_checklist_items').delete(id)
