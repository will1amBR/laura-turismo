import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGroups, createGroup, deleteGroup, GroupRecord } from '@/services/groups'
import { getPackages, PackageRecord } from '@/services/packages'
import { useAuth } from '@/hooks/use-auth'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Plus, Trash2, Settings } from 'lucide-react'
import { DEPARTURE_AIRPORTS } from '@/components/FlightSearchFilter'

export function ManageGroups() {
  const { user } = useAuth()
  const [groups, setGroups] = useState<GroupRecord[]>([])
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [openModal, setOpenModal] = useState(false)

  const [packageId, setPackageId] = useState('')
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [capacity, setCapacity] = useState(12)
  const [departureAirport, setDepartureAirport] = useState('')
  const [arrivalAirport, setArrivalAirport] = useState('')

  const loadData = () => {
    getGroups()
      .then(setGroups)
      .catch(() => {})
    getPackages()
      .then(setPackages)
      .catch(() => {})
  }

  useEffect(() => {
    loadData()
  }, [])

  const resetForm = () => {
    setName('')
    setPackageId('')
    setStartDate('')
    setEndDate('')
    setCapacity(12)
    setDepartureAirport('')
    setArrivalAirport('')
  }

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!packageId || !user) return

    try {
      await createGroup({
        package: packageId,
        name,
        start_date: startDate ? new Date(startDate).toISOString() : '',
        end_date: endDate ? new Date(endDate).toISOString() : '',
        capacity: Number(capacity),
        current_members: 0,
        status: 'em_formacao',
        admin: user.id,
        departure_airport: departureAirport,
        arrival_airport: arrivalAirport,
      })
      toast({ title: 'Grupo criado com sucesso!' })
      setOpenModal(false)
      resetForm()
      loadData()
    } catch {
      toast({ title: 'Erro ao criar grupo', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este grupo?')) return
    try {
      await deleteGroup(id)
      toast({ title: 'Grupo excluído' })
      loadData()
    } catch {
      toast({ title: 'Erro ao excluir grupo', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Gestão de Grupos de Viagem</h2>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-1">
              <Plus className="w-4 h-4" /> Criar Grupo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Grupo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateGroup} className="space-y-3 pt-2">
              <div>
                <Label>Pacote</Label>
                <Select value={packageId} onValueChange={setPackageId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o pacote..." />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Nome do Grupo</Label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Grupo Março 2025"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Data de Início</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Data de Fim</Label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Capacidade (Pessoas)</Label>
                <Input
                  type="number"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Aeroporto de Saída</Label>
                <Select value={departureAirport} onValueChange={setDepartureAirport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aeroporto..." />
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
                <Label>Aeroporto de Chegada</Label>
                <Input
                  value={arrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                  placeholder="Ex: Santiago (SCL)"
                />
              </div>
              <Button type="submit" className="w-full bg-teal-700 text-white">
                Salvar Grupo
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">{group.name}</CardTitle>
                <p className="text-xs text-slate-500">{group.expand?.package?.title}</p>
              </div>
              <div className="flex gap-1">
                <Link to={`/grupo/${group.id}`}>
                  <Button variant="ghost" size="icon" className="text-teal-700">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => handleDelete(group.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                Período: {formatDate(group.start_date)} até {formatDate(group.end_date)}
              </p>
              {(group.departure_airport || group.arrival_airport) && (
                <p className="text-xs">
                  <span className="font-semibold">Rota:</span> {group.departure_airport || '—'} →{' '}
                  {group.arrival_airport || '—'}
                </p>
              )}
              <div className="flex justify-between items-center pt-2">
                <Badge variant="outline">
                  {group.current_members} / {group.capacity} membros
                </Badge>
                <Badge className="bg-amber-500 text-slate-950 capitalize">
                  {group.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
