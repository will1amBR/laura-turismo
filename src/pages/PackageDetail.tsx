import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Users, Share2, ArrowLeft, CheckCircle, Clock, Filter, X } from 'lucide-react'
import { getPackage, PackageRecord, getPackageImageUrl } from '@/services/packages'
import { getPackageGroups, GroupRecord } from '@/services/groups'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [pkg, setPkg] = useState<PackageRecord | null>(null)
  const [groups, setGroups] = useState<GroupRecord[]>([])
  const [loading, setLoading] = useState(true)

  const [minStartDate, setMinStartDate] = useState('')
  const [maxEndDate, setMaxEndDate] = useState('')
  const [minSpots, setMinSpots] = useState(0)
  const [maxCapacity, setMaxCapacity] = useState('')

  useEffect(() => {
    if (!id) return
    Promise.all([getPackage(id), getPackageGroups(id)])
      .then(([pData, gData]) => {
        setPkg(pData)
        setGroups(gData.filter((g) => g.status === 'em_formacao' || g.status === 'confirmado'))
      })
      .catch(() => toast({ title: 'Pacote não encontrado', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }, [id])

  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      if (minStartDate && new Date(g.start_date) < new Date(minStartDate)) return false
      if (maxEndDate && new Date(g.end_date) > new Date(maxEndDate)) return false
      const remaining = g.capacity - (g.current_members || 0)
      if (minSpots > 0 && remaining < minSpots) return false
      if (maxCapacity && g.capacity > Number(maxCapacity)) return false
      return true
    })
  }, [groups, minStartDate, maxEndDate, minSpots, maxCapacity])

  const hasActiveFilters = minStartDate || maxEndDate || minSpots > 0 || maxCapacity

  const clearFilters = () => {
    setMinStartDate('')
    setMaxEndDate('')
    setMinSpots(0)
    setMaxCapacity('')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: pkg?.title, text: pkg?.description, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({ title: 'Link copiado para a área de transferência!' })
    }
  }

  const handleSelectGroup = (groupId: string) => {
    if (isAuthenticated) {
      navigate(`/pagamento/${groupId}`)
    } else {
      navigate(`/entrar?redirect=/pagamento/${groupId}`)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-700 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-slate-600">Carregando detalhes do pacote...</p>
      </div>
    )
  }

  if (!pkg) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Pacote não encontrado</h1>
        <Button onClick={() => navigate('/')}>Voltar para o início</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 text-slate-600 mb-2">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Button>

      <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-lg">
        <img src={getPackageImageUrl(pkg)} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex items-end p-6 md:p-10">
          <div className="text-white space-y-2">
            <div className="flex gap-2">
              <Badge className="bg-amber-500 text-slate-950 font-bold">
                {pkg.duration_days} Dias / {pkg.duration_days - 1} Noites
              </Badge>
              <Badge variant="outline" className="text-white border-white/40">
                Chile
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-black">{pkg.title}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-teal-900">Sobre este roteiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 leading-relaxed whitespace-pre-line">
              {pkg.description}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-700" /> Grupos com vagas abertas
            </h2>

            {groups.length > 0 && (
              <Card className="border-slate-200 bg-slate-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-700">Filtrar grupos</h3>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-xs h-7"
                        onClick={clearFilters}
                      >
                        <X className="w-3 h-3" /> Limpar
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <Label className="text-xs">Saída a partir de</Label>
                      <Input
                        type="date"
                        value={minStartDate}
                        onChange={(e) => setMinStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Retorno até</Label>
                      <Input
                        type="date"
                        value={maxEndDate}
                        onChange={(e) => setMaxEndDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Vagas mínimas</Label>
                      <Input
                        type="number"
                        min="0"
                        value={minSpots || ''}
                        onChange={(e) => setMinSpots(Number(e.target.value) || 0)}
                        placeholder="Qualquer"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Capacidade máxima</Label>
                      <Select value={maxCapacity} onValueChange={setMaxCapacity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Qualquer</SelectItem>
                          <SelectItem value="5">Até 5 pessoas</SelectItem>
                          <SelectItem value="10">Até 10 pessoas</SelectItem>
                          <SelectItem value="15">Até 15 pessoas</SelectItem>
                          <SelectItem value="20">Até 20 pessoas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    {filteredGroups.length} grupo(s) encontrado(s)
                  </p>
                </CardContent>
              </Card>
            )}

            {filteredGroups.length === 0 ? (
              <Card className="p-8 text-center text-slate-600 bg-slate-50 border-dashed">
                {groups.length === 0
                  ? 'Não há grupos abertos para este pacote no momento.'
                  : 'Nenhum grupo corresponde aos filtros selecionados.'}
              </Card>
            ) : (
              filteredGroups.map((group) => {
                const percent = Math.min(
                  100,
                  Math.round((group.current_members / group.capacity) * 100),
                )
                const remaining = group.capacity - (group.current_members || 0)
                return (
                  <Card
                    key={group.id}
                    className="border-teal-100 hover:border-teal-300 transition-colors shadow-sm"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            Saída: {formatDate(group.start_date)} até {formatDate(group.end_date)}
                          </p>
                        </div>
                        <Badge
                          className={
                            group.status === 'confirmado'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-500 text-slate-950'
                          }
                        >
                          {group.status === 'confirmado' ? 'Grupo Confirmado!' : 'Em formação'}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-600 font-medium">
                          <span>
                            Inscritos: {group.current_members} de {group.capacity} pessoas
                            {remaining > 0 && (
                              <span className="text-emerald-600 ml-1">({remaining} vagas)</span>
                            )}
                          </span>
                          <span>{percent}% preenchido</span>
                        </div>
                        <Progress value={percent} className="h-2 bg-slate-100" />
                      </div>

                      <Button
                        onClick={() => handleSelectGroup(group.id)}
                        disabled={group.current_members >= group.capacity}
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold"
                      >
                        {group.current_members >= group.capacity
                          ? 'Grupo Lotado'
                          : 'Quero entrar neste grupo'}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24 border-teal-200 bg-teal-50/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-slate-500 font-semibold">
                Valor do Investimento
              </CardTitle>
              <div className="text-3xl font-extrabold text-teal-900">
                {formatCurrency(pkg.price_cents)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ pessoa</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-700">
              <div className="space-y-2 border-t pt-4">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Guia especializado em
                  português
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Traslados privativos inclusos
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Suporte 24h durante a viagem
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" /> Vagas limitadas por grupo
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleShare}
                className="w-full gap-2 border-slate-300"
              >
                <Share2 className="w-4 h-4" /> Compartilhar Pacote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
