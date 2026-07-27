import { useEffect, useState } from 'react'
import { getLeads, updateLeadStatus, createLead, LeadRecord } from '@/services/leads'
import { useRealtime } from '@/hooks/use-realtime'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Plus, Phone, ArrowLeft, ArrowRight } from 'lucide-react'

const columns: { key: LeadRecord['status']; label: string; color: string }[] = [
  { key: 'novo', label: 'Novo', color: 'bg-blue-50 border-blue-200 text-blue-900' },
  { key: 'contatado', label: 'Contatado', color: 'bg-amber-50 border-amber-200 text-amber-900' },
  {
    key: 'qualificado',
    label: 'Qualificado',
    color: 'bg-purple-50 border-purple-200 text-purple-900',
  },
  {
    key: 'convertido',
    label: 'Convertido',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  },
  { key: 'perdido', label: 'Perdido', color: 'bg-slate-100 border-slate-300 text-slate-700' },
]

export function LeadsKanban() {
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [origem, setOrigem] = useState<LeadRecord['origem']>('site')

  const loadLeads = () => {
    getLeads()
      .then(setLeads)
      .catch(() => {})
  }

  useEffect(() => {
    loadLeads()
  }, [])

  useRealtime('leads', () => {
    loadLeads()
  })

  const handleMoveStatus = async (
    leadId: string,
    currentStatus: LeadRecord['status'],
    direction: 'next' | 'prev',
  ) => {
    const keys = columns.map((c) => c.key)
    const currIdx = keys.indexOf(currentStatus)
    const newIdx = direction === 'next' ? currIdx + 1 : currIdx - 1
    if (newIdx < 0 || newIdx >= keys.length) return

    try {
      await updateLeadStatus(leadId, keys[newIdx])
      toast({ title: `Status alterado para "${columns[newIdx].label}"` })
      loadLeads()
    } catch {
      toast({ title: 'Erro ao atualizar status', variant: 'destructive' })
    }
  }

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      await createLead({ name, phone, origem, status: 'novo' })
      toast({ title: 'Lead adicionado!' })
      setName('')
      setPhone('')
      setOpenModal(false)
      loadLeads()
    } catch {
      toast({ title: 'Erro ao criar lead', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Kanban de Qualificação de Leads</h2>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-1">
              <Plus className="w-4 h-4" /> Novo Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Lead</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateLead} className="space-y-4 pt-2">
              <div>
                <Label>Nome Completo</Label>
                <Input required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Telefone / WhatsApp</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label>Origem</Label>
                <Select value={origem} onValueChange={(val: any) => setOrigem(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site">Site</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-teal-700 text-white">
                Criar Lead
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.key)
          return (
            <div
              key={col.key}
              className="bg-slate-100 p-3 rounded-2xl flex flex-col gap-3 min-w-[220px]"
            >
              <div className="flex items-center justify-between px-1">
                <span className="font-bold text-slate-800 text-sm">{col.label}</span>
                <Badge variant="outline" className="bg-white">
                  {colLeads.length}
                </Badge>
              </div>

              <div className="space-y-3 flex-1">
                {colLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-sm font-bold text-slate-900">
                        {lead.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-xs space-y-2">
                      {lead.phone && (
                        <p className="text-slate-600 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-teal-600" /> {lead.phone}
                        </p>
                      )}
                      <Badge variant="secondary" className="text-[10px] capitalize">
                        {lead.origem}
                      </Badge>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          disabled={col.key === 'novo'}
                          onClick={() => handleMoveStatus(lead.id, lead.status, 'prev')}
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          disabled={col.key === 'perdido'}
                          onClick={() => handleMoveStatus(lead.id, lead.status, 'next')}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
