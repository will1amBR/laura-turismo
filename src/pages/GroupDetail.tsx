import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Users, CheckCircle, Plus, MapPin, ArrowLeft } from 'lucide-react'
import { getGroup, GroupRecord } from '@/services/groups'
import { getGroupMembers, updateMemberStatus, GroupMemberRecord } from '@/services/members'
import {
  getGroupSchedules,
  createScheduleWithPhoto,
  getSchedulePhotoUrl,
  DailyScheduleRecord,
} from '@/services/schedules'
import { formatDate } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { GroupChecklist } from '@/components/GroupChecklist'
import { ChecklistManager } from '@/components/ChecklistManager'
import { SchedulePhotoUpload } from '@/components/SchedulePhotoUpload'

export default function GroupDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [group, setGroup] = useState<GroupRecord | null>(null)
  const [members, setMembers] = useState<GroupMemberRecord[]>([])
  const [schedules, setSchedules] = useState<DailyScheduleRecord[]>([])
  const [loading, setLoading] = useState(true)

  const [addDayOpen, setAddDayOpen] = useState(false)
  const [dayNumber, setDayNumber] = useState(1)
  const [dayTitle, setDayTitle] = useState('')
  const [dayDesc, setDayDesc] = useState('')
  const [breakfast, setBreakfast] = useState('')
  const [lunch, setLunch] = useState('')
  const [dinner, setDinner] = useState('')
  const [reminderInput, setReminderInput] = useState('')
  const [dayPhoto, setDayPhoto] = useState<File | null>(null)

  const loadData = async () => {
    if (!id) return
    try {
      const [g, m, s] = await Promise.all([
        getGroup(id),
        getGroupMembers(id),
        getGroupSchedules(id),
      ])
      setGroup(g)
      setMembers(m)
      setSchedules(s)
    } catch {
      toast({ title: 'Erro ao carregar dados do grupo', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  useRealtime('group_members', () => {
    loadData()
  })
  useRealtime('daily_schedules', () => {
    loadData()
  })

  const handleApproveMember = async (memberId: string, status: 'aprovado' | 'recusado') => {
    try {
      await updateMemberStatus(memberId, status)
      toast({ title: `Membro ${status === 'aprovado' ? 'aprovado' : 'recusado'}!` })
      loadData()
    } catch {
      toast({ title: 'Erro ao atualizar membro', variant: 'destructive' })
    }
  }

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !dayTitle.trim()) return
    try {
      const remindersArray = reminderInput
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean)

      await createScheduleWithPhoto(
        {
          group: id,
          day_number: Number(dayNumber),
          title: dayTitle,
          description: dayDesc,
          breakfast,
          lunch,
          dinner,
          reminders: JSON.stringify(remindersArray),
        },
        dayPhoto,
      )

      toast({ title: 'Dia adicionado ao roteiro com sucesso!' })
      setAddDayOpen(false)
      setDayTitle('')
      setDayDesc('')
      setBreakfast('')
      setLunch('')
      setDinner('')
      setReminderInput('')
      setDayPhoto(null)
      loadData()
    } catch {
      toast({ title: 'Erro ao criar dia no roteiro', variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-700 border-t-transparent rounded-full mx-auto" />
      </div>
    )
  }

  if (!group) return <div className="container mx-auto px-4 py-16">Grupo não encontrado.</div>

  const steps = [
    { key: 'em_formacao', label: 'Em Formação' },
    { key: 'confirmado', label: 'Confirmado' },
    { key: 'roteiro', label: 'Roteiro Definido' },
    { key: 'em_andamento', label: 'Em Andamento' },
    { key: 'finalizado', label: 'Finalizado' },
  ]

  const getCurrentStepIndex = () => {
    if (group.status === 'em_formacao') return 0
    if (group.status === 'confirmado' && schedules.length === 0) return 1
    if (group.status === 'confirmado' && schedules.length > 0) return 2
    if (group.status === 'em_andamento') return 3
    if (group.status === 'finalizado') return 4
    return 0
  }

  const currentStep = getCurrentStepIndex()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/meus-grupos')}
        className="gap-2 text-slate-600"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para Meus Grupos
      </Button>

      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge className="bg-amber-400 text-slate-950 font-bold mb-2">
              {group.expand?.package?.title}
            </Badge>
            <h1 className="text-3xl font-extrabold">{group.name}</h1>
            <p className="text-teal-200 text-sm flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              {formatDate(group.start_date)} até {formatDate(group.end_date)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-2xl text-center border border-white/10">
            <span className="text-xs text-teal-200 block uppercase font-medium">
              Membros no Grupo
            </span>
            <span className="text-2xl font-black">
              {group.current_members} / {group.capacity}
            </span>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs font-semibold uppercase text-teal-200 mb-3">Progresso da Viagem</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {steps.map((step, idx) => {
              const isDone = idx < currentStep
              const isCurrent = idx === currentStep
              return (
                <div
                  key={step.key}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all border ${
                    isDone
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                      : isCurrent
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                        : 'bg-white/5 text-slate-400 border-white/5'
                  }`}
                >
                  {step.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-teal-700" /> Roteiro do Grupo
            </h2>
            <div className="flex items-center gap-2">
              {isAdmin && <ChecklistManager groupId={group.id} />}
              {isAdmin && (
                <Dialog open={addDayOpen} onOpenChange={setAddDayOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-1 text-sm">
                      <Plus className="w-4 h-4" /> Adicionar Dia
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Dia ao Roteiro</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddSchedule} className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Número do Dia</Label>
                          <Input
                            type="number"
                            required
                            value={dayNumber}
                            onChange={(e) => setDayNumber(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Título do Dia</Label>
                          <Input
                            required
                            placeholder="Ex: City Tour"
                            value={dayTitle}
                            onChange={(e) => setDayTitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Descrição das atividades</Label>
                        <Textarea
                          value={dayDesc}
                          onChange={(e) => setDayDesc(e.target.value)}
                          placeholder="Detalhes do dia..."
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-xs">Café da Manhã</Label>
                          <Input
                            value={breakfast}
                            onChange={(e) => setBreakfast(e.target.value)}
                            placeholder="Incluso"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Almoço</Label>
                          <Input
                            value={lunch}
                            onChange={(e) => setLunch(e.target.value)}
                            placeholder="Livre"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Jantar</Label>
                          <Input
                            value={dinner}
                            onChange={(e) => setDinner(e.target.value)}
                            placeholder="Incluso"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Lembretes (um por linha)</Label>
                        <Textarea
                          value={reminderInput}
                          onChange={(e) => setReminderInput(e.target.value)}
                          placeholder="Levar passaporte&#10;Protetor solar"
                        />
                      </div>
                      <div>
                        <Label>Foto do destino (opcional)</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setDayPhoto(e.target.files?.[0] ?? null)}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-teal-700 text-white">
                        Salvar Dia
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {schedules.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 border-dashed">
              O roteiro detalhado será divulgado pelo administrador assim que o grupo for
              confirmado!
            </Card>
          ) : (
            <div className="space-y-4">
              {schedules.map((sch) => {
                let remindersList: string[] = []
                if (sch.reminders) {
                  try {
                    remindersList =
                      typeof sch.reminders === 'string' ? JSON.parse(sch.reminders) : sch.reminders
                  } catch {
                    remindersList = []
                  }
                }
                const photoUrl = getSchedulePhotoUrl(sch)
                return (
                  <Card key={sch.id} className="border-slate-200">
                    <CardHeader className="bg-slate-50 pb-3 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-teal-900 font-bold">
                          {sch.title}
                        </CardTitle>
                        {isAdmin && <SchedulePhotoUpload scheduleId={sch.id} />}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed">{sch.description}</p>
                      {photoUrl && (
                        <img
                          src={photoUrl}
                          alt={sch.title}
                          className="w-full max-h-72 object-cover rounded-xl"
                        />
                      )}
                      {(sch.breakfast || sch.lunch || sch.dinner) && (
                        <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="font-bold text-teal-800">Café:</span>{' '}
                            {sch.breakfast || 'Não informado'}
                          </div>
                          <div>
                            <span className="font-bold text-teal-800">Almoço:</span>{' '}
                            {sch.lunch || 'Não informado'}
                          </div>
                          <div>
                            <span className="font-bold text-teal-800">Jantar:</span>{' '}
                            {sch.dinner || 'Não informado'}
                          </div>
                        </div>
                      )}
                      {remindersList.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                            Lembretes importantes:
                          </p>
                          <ul className="space-y-1">
                            {remindersList.map((rem, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-xs text-slate-600"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{rem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <GroupChecklist groupId={group.id} />
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-700" /> Participantes
                </span>
                <Badge variant="outline">{members.length} membros</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 divide-y">
              {members.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  Nenhum membro inscrito ainda.
                </p>
              ) : (
                members.map((m) => {
                  const mUser = m.expand?.user
                  return (
                    <div key={m.id} className="py-3 flex items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold text-slate-900">{mUser?.name || 'Membro'}</p>
                        <p className="text-xs text-slate-500">{mUser?.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {m.status === 'aprovado' ? (
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                            Aprovado
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Pendente
                          </Badge>
                        )}
                        {isAdmin && m.status === 'pendente' && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs text-white"
                              onClick={() => handleApproveMember(m.id, 'aprovado')}
                            >
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7 text-xs"
                              onClick={() => handleApproveMember(m.id, 'recusado')}
                            >
                              Recusar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
