import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { LeadsKanban } from './LeadsKanban'
import { ManagePackages } from './ManagePackages'
import { ManageGroups } from './ManageGroups'
import { ManageAirlineQuotes } from './ManageAirlineQuotes'
import { getLeads, LeadRecord } from '@/services/leads'
import { getGroups, GroupRecord } from '@/services/groups'
import pb from '@/lib/pocketbase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ShieldCheck,
  Users,
  Package,
  Compass,
  Plane,
  TrendingUp,
  UserCheck,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react'

export default function AdminDashboard() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Dashboard Stats State
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [groups, setGroups] = useState<GroupRecord[]>([])
  const [membersCount, setMembersCount] = useState(0)
  const [statsLoading, setStatsLoading] = useState(true)

  const loadDashboardData = async () => {
    try {
      const [leadsData, groupsData, membersRes] = await Promise.all([
        getLeads(),
        getGroups(),
        pb.collection('group_members').getList(1, 1),
      ])
      setLeads(leadsData)
      setGroups(groupsData)
      setMembersCount(membersRes.totalItems)
    } catch (err) {
      console.error('Erro ao carregar estatísticas do dashboard:', err)
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadDashboardData()
    }
  }, [isAuthenticated, isAdmin])

  if (loading) return null
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />
  }

  // Calculated Stats
  const totalLeads = leads.length
  const leadsNovo = leads.filter((l) => l.status === 'novo').length
  const leadsContatado = leads.filter((l) => l.status === 'contatado').length
  const leadsQualificado = leads.filter((l) => l.status === 'qualificado').length
  const leadsConvertido = leads.filter((l) => l.status === 'convertido').length
  const leadsPerdido = leads.filter((l) => l.status === 'perdido').length

  const activeGroups = groups.filter(
    (g) => g.status === 'em_formacao' || g.status === 'confirmado',
  ).length
  const totalGroups = groups.length

  const conversionRate = totalLeads > 0 ? Math.round((leadsConvertido / totalLeads) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-amber-600" /> Painel de Administração
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Métricas em tempo real, gestão de Leads Kanban, Grupos e Pacotes.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-200/80 p-1 rounded-xl flex-wrap">
          <TabsTrigger value="dashboard" className="gap-2 font-bold">
            <TrendingUp className="w-4 h-4" /> Visão Geral (Dashboard)
          </TabsTrigger>
          <TabsTrigger value="leads" className="gap-2 font-bold">
            <Users className="w-4 h-4" /> Kanban de Leads ({totalLeads})
          </TabsTrigger>
          <TabsTrigger value="grupos" className="gap-2 font-bold">
            <Compass className="w-4 h-4" /> Grupos ({groups.length})
          </TabsTrigger>
          <TabsTrigger value="pacotes" className="gap-2 font-bold">
            <Package className="w-4 h-4" /> Pacotes
          </TabsTrigger>
          <TabsTrigger value="cotacoes" className="gap-2 font-bold">
            <Plane className="w-4 h-4" /> Cotações Aéreas
          </TabsTrigger>
        </TabsList>

        {/* DASHBOARD REAL DATA METRICS */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Leads */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Total de Leads
                    </p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">
                      {statsLoading ? '...' : totalLeads}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Interessados registrados</p>
                  </div>
                  <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grupos Ativos */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Grupos Ativos
                    </p>
                    <h3 className="text-3xl font-black text-emerald-700 mt-1">
                      {statsLoading ? '...' : activeGroups}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{totalGroups} grupos no total</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Membros Inscritos */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Clientes em Grupos
                    </p>
                    <h3 className="text-3xl font-black text-teal-800 mt-1">
                      {statsLoading ? '...' : membersCount}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Inscrições cadastradas</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-2xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Taxa de Conversão */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Taxa de Conversão
                    </p>
                    <h3 className="text-3xl font-black text-amber-600 mt-1">
                      {statsLoading ? '...' : `${conversionRate}%`}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {leadsConvertido} leads convertidos
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Breakdown Leads by Status */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center justify-between">
                <span>Funil de Leads por Etapa</span>
                <Badge variant="outline" className="border-teal-600 text-teal-700">
                  {totalLeads} no Funil
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-center">
                  <p className="text-xs font-bold text-sky-800 uppercase">Novo</p>
                  <p className="text-2xl font-black text-sky-900 mt-1">{leadsNovo}</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                  <p className="text-xs font-bold text-amber-800 uppercase">Contatado</p>
                  <p className="text-2xl font-black text-amber-900 mt-1">{leadsContatado}</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
                  <p className="text-xs font-bold text-purple-800 uppercase">Qualificado</p>
                  <p className="text-2xl font-black text-purple-900 mt-1">{leadsQualificado}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-xs font-bold text-emerald-800 uppercase">Convertido</p>
                  <p className="text-2xl font-black text-emerald-900 mt-1">{leadsConvertido}</p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-center col-span-2 sm:col-span-1">
                  <p className="text-xs font-bold text-rose-800 uppercase">Perdido</p>
                  <p className="text-2xl font-black text-rose-900 mt-1">{leadsPerdido}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <LeadsKanban />
        </TabsContent>

        <TabsContent value="pacotes">
          <ManagePackages />
        </TabsContent>

        <TabsContent value="grupos">
          <ManageGroups />
        </TabsContent>

        <TabsContent value="cotacoes">
          <ManageAirlineQuotes />
        </TabsContent>
      </Tabs>
    </div>
  )
}
