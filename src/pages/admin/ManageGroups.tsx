import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGroups, createGroup, updateGroup, deleteGroup, GroupRecord } from '@/services/groups'
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
import { Plus, Trash2, Settings, Pencil } from 'lucide-react'
import { DEPARTURE_AIRPORTS } from '@/components/FlightSearchFilter'

export function ManageGroups() {
  const { user } = useAuth()
  const [groups, setGroups] = useState<GroupRecord[]>([])
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<GroupRecord | null>(null)

  // Create form state
  const [packageId, setPackageId] = useState('')
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [capacity, setCapacity] = useState(12)
  const [departureAirport, setDepartureAirport] = useState('')
  const [arrivalAirport, setArrivalAirport] = useState('')

  // Edit form state
  const [editPackageId, setEditPackageId] = useState('')
  const [editName, setEditName] = useState('')
  const [editStartDate, setEditStartDate] = useState('')
  const [editEndDate, setEditEndDate] = useState('')
  const [editCapacity, setEditCapacity] = useState(12)
  const [editCurrentMembers, setEditCurrentMembers] = useState(0)
  const [editDepartureAirport, setEditDepartureAirport] = useState('')
  const [editArrivalAirport, setEditArrivalAirport] = useState('')
  const [editStatus, setEditStatus] = useState<GroupRecord['status']>('em_formacao')

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

  const handleOpenEdit = (group: GroupRecord) => {
    setEditingGroup(group)
    setEditPackageId(group.package || '')
    setEditName(group.name || '')
    setEditStartDate(group.start_date ? group.start_date.substring(0, 10) : '')
    setEditEndDate(group.end_date ? group.end_date.substring(0, 10) : '')
    setEditCapacity(group.capacity || 12)
    setEditCurrentMembers(group.current_members || 0)
    setEditDepartureAirport(group.departure_airport || '')
    setEditArrivalAirport(group.arrival_airport || '')
    setEditStatus(group.status || 'em_formacao')
    setEditModalOpen(true)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGroup) return

    try {
      await updateGroup(editingGroup.id, {
        package: editPackageId,
        name: editName,
        start_date: editStartDate ? new Date(editStartDate).toISOString() : '',
        end_date: editEndDate ? new Date(editEndDate).toISOString() : '',
        capacity: Number(editCapacity),
        current_members: Number(editCurrentMembers),
        status: editStatus,
        departure_airport: editDepartureAirport,
        arrival_airport: editArrivalAirport,
      })
      toast({ title: 'Grupo atualizado com sucesso!' })
      setEditModalOpen(false)
      setEditingGroup(null)
      loadData()
    } catch {
      toast({ title: 'Erro ao atualizar grupo', variant: 'destructive' })
    }
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  title="Editar Grupo"
                  onClick={() => handleOpenEdit(group)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Link to={`/grupo/${group.id}`} title="Ver / Gerenciar Roteiro">
                  <Button variant="ghost" size="icon" className="text-teal-700">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Excluir Grupo"
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

      {/* Edit Group Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Grupo de Viagem</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-3 pt-2">
            <div>
              <Label>Pacote</Label>
              <Select value={editPackageId} onValueChange={setEditPackageId}>
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
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Ex: Grupo Especial Neve 2026"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Data de Início</Label>
                <Input
                  type="date"
                  value={editStartDate}
                  onChange={(e) => setEditStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Data de Fim</Label>
                <Input
                  type="date"
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Capacidade Total</Label>
                <Input
                  type="number"
                  required
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Vagas Ocupadas</Label>
                <Input
                  type="number"
                  required
                  value={editCurrentMembers}
                  onChange={(e) => setEditCurrentMembers(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <Label>Status do Grupo</Label>
              <Select
                value={editStatus}
                onValueChange={(val) => setEditStatus(val as GroupRecord['status'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_formacao">🟡 Em Formação</SelectItem>
                  <SelectItem value="confirmado">🟢 Confirmado</SelectItem>
                  <SelectItem value="em_andamento">✈️ Em Andamento</SelectItem>
                  <SelectItem value="finalizado">✅ Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Aeroporto de Saída</Label>
              <Select value={editDepartureAirport} onValueChange={setEditDepartureAirport}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o aeroporto de saída..." />
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
                value={editArrivalAirport}
                onChange={(e) => setEditArrivalAirport(e.target.value)}
                placeholder="Ex: Santiago (SCL)"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-1/2"
                onClick={() => setEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-1/2 bg-teal-700 hover:bg-teal-800 text-white font-bold"
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
