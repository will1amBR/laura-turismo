import pb from '@/lib/pocketbase/client'

export interface LeadRecord {
  id: string
  name: string
  phone?: string
  origem: 'indicacao' | 'instagram' | 'site' | 'outros'
  status: 'novo' | 'contatado' | 'qualificado' | 'convertido' | 'perdido'
  notes?: string
  created: string
  updated: string
}

export const getLeads = () => pb.collection('leads').getFullList<LeadRecord>({ sort: '-created' })
export const createLead = (data: Partial<LeadRecord>) =>
  pb.collection('leads').create<LeadRecord>(data)
export const updateLeadStatus = (id: string, status: LeadRecord['status']) =>
  pb.collection('leads').update<LeadRecord>(id, { status })
export const updateLead = (id: string, data: Partial<LeadRecord>) =>
  pb.collection('leads').update<LeadRecord>(id, data)
export const deleteLead = (id: string) => pb.collection('leads').delete(id)
