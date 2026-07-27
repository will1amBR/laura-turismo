import { useEffect, useState } from 'react'
import { getGroups, GroupRecord } from '@/services/groups'
import {
  getGroupQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
  AirlineQuoteRecord,
} from '@/services/airline-quotes'
import { useRealtime } from '@/hooks/use-realtime'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Plus, Trash2, Pencil, Plane, Ticket } from 'lucide-react'
import { DEPARTURE_AIRPORTS } from '@/components/FlightSearchFilter'

const AIRLINES = [
  'LATAM Airlines',
  'Gol Linhas Aéreas',
  'Azul Linhas Aéreas',
  'Sky Airline',
  'Jetsmart',
]

interface QuoteFormData {
  group: string
  airline_name: string
  departure_airport: string
  arrival_airport: string
  departure_date: string
  return_date: string
  price_cents: number
  notes: string
}

const emptyForm: QuoteFormData = {
  group: '',
  airline_name: '',
  departure_airport: '',
  arrival_airport: '',
  departure_date: '',
  return_date: '',
  price_cents: 0,
  notes: '',
}

export function ManageAirlineQuotes() {
  const [groups, setGroups] = useState<GroupRecord[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [quotes, setQuotes] = useState<AirlineQuoteRecord[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<QuoteFormData>(emptyForm)

  const loadGroups = () => {
    getGroups()
      .then(setGroups)
      .catch(() => {})
  }

  const loadQuotes = (groupId: string) => {
    if (!groupId) {
      setQuotes([])
      return
    }
    getGroupQuotes(groupId)
      .then(setQuotes)
      .catch(() => {})
  }

  useEffect(() => {
    loadGroups()
  }, [])

  useEffect(() => {
    if (selectedGroupId) loadQuotes(selectedGroupId)
  }, [selectedGroupId])

  useRealtime('airline_quotes', () => {
    if (selectedGroupId) loadQuotes(selectedGroupId)
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ ...emptyForm, group: selectedGroupId })
    setOpenModal(true)
  }

  const handleOpenEdit = (quote: AirlineQuoteRecord) => {
    setEditingId(quote.id)
    setFormData({
      group: quote.group,
      airline_name: quote.airline_name,
      departure_airport: quote.departure_airport || '',
      arrival_airport: quote.arrival_airport || '',
      departure_date: quote.departure_date ? quote.departure_date.split('T')[0] : '',
      return_date: quote.return_date ? quote.return_date.split('T')[0] : '',
      price_cents: quote.price_cents,
      notes: quote.notes || '',
    })
    setOpenModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        departure_date: formData.departure_date
          ? new Date(formData.departure_date).toISOString()
          : '',
        return_date: formData.return_date ? new Date(formData.return_date).toISOString() : '',
      }

      if (editingId) {
        await updateQuote(editingId, payload)
        toast({ title: 'Cotação atualizada!' })
      } else {
        await createQuote(payload)
        toast({ title: 'Cotação adicionada!' })
      }
      setOpenModal(false)
      setFormData(emptyForm)
      setEditingId(null)
      if (selectedGroupId) loadQuotes(selectedGroupId)
    } catch {
      toast({ title: 'Erro ao salvar cotação', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir esta cotação?')) return
    try {
      await deleteQuote(id)
      toast({ title: 'Cotação excluída' })
      if (selectedGroupId) loadQuotes(selectedGroupId)
    } catch {
      toast({ title: 'Erro ao excluir cotação', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-bold text-slate-900">Cotações Aéreas</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Selecione um grupo..." />
            </SelectTrigger>
            <SelectContent>
              {groups.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedGroupId && (
            <Button
              onClick={handleOpenAdd}
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-1"
            >
              <Plus className="w-4 h-4" /> Nova
            </Button>
          )}
        </div>
      </div>

      {!selectedGroupId ? (
        <Card className="p-12 text-center border-dashed">
          <Plane className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Selecione um grupo para gerenciar cotações.</p>
        </Card>
      ) : quotes.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Nenhuma cotação cadastrada para este grupo.</p>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left p-3 font-semibold">Cia Aérea</th>
                <th className="text-left p-3 font-semibold">Rota</th>
                <th className="text-left p-3 font-semibold">Ida</th>
                <th className="text-left p-3 font-semibold">Volta</th>
                <th className="text-right p-3 font-semibold">Preço</th>
                <th className="text-left p-3 font-semibold">Notas</th>
                <th className="text-center p-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">{q.airline_name}</td>
                  <td className="p-3 text-slate-600 text-xs">
                    {q.departure_airport || '—'} → {q.arrival_airport || '—'}
                  </td>
                  <td className="p-3 text-slate-600 text-xs">
                    {q.departure_date ? formatDate(q.departure_date) : '—'}
                  </td>
                  <td className="p-3 text-slate-600 text-xs">
                    {q.return_date ? formatDate(q.return_date) : '—'}
                  </td>
                  <td className="p-3 text-right font-bold text-teal-800">
                    {formatCurrency(q.price_cents)}
                  </td>
                  <td
                    className="p-3 text-slate-500 text-xs max-w-32 truncate"
                    title={q.notes || ''}
                  >
                    {q.notes || '—'}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-teal-700"
                        onClick={() => handleOpenEdit(q)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(q.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Cotação' : 'Nova Cotação Aérea'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div>
              <Label>Grupo</Label>
              <Select
                value={formData.group}
                onValueChange={(v) => setFormData({ ...formData, group: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Companhia Aérea</Label>
              <Select
                value={formData.airline_name}
                onValueChange={(v) => setFormData({ ...formData, airline_name: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {AIRLINES.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Aeroporto de Saída</Label>
                <Select
                  value={formData.departure_airport}
                  onValueChange={(v) => setFormData({ ...formData, departure_airport: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTURE_AIRPORTS.map((airport) => (
                      <SelectItem key={airport} value={airport}>
                        {airport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Aeroporto de Chegada</Label>
                <Input
                  value={formData.arrival_airport}
                  onChange={(e) => setFormData({ ...formData, arrival_airport: e.target.value })}
                  placeholder="Ex: Santiago (SCL)"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Data de Ida</Label>
                <Input
                  type="date"
                  value={formData.departure_date}
                  onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-xs">Data de Volta</Label>
                <Input
                  type="date"
                  value={formData.return_date}
                  onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                required
                value={formData.price_cents}
                onChange={(e) => setFormData({ ...formData, price_cents: Number(e.target.value) })}
                placeholder="Ex: 320000 (R$ 3.200,00)"
              />
              <p className="text-xs text-slate-400 mt-1">
                Valor em centavos. R$ {formatCurrency(formData.price_cents)}
              </p>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ex: Voo direto, bagagem inclusa..."
              />
            </div>
            <Button type="submit" className="w-full bg-teal-700 text-white">
              {editingId ? 'Atualizar Cotação' : 'Salvar Cotação'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
