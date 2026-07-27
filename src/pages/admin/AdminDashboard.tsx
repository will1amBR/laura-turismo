import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { LeadsKanban } from './LeadsKanban'
import { ManagePackages } from './ManagePackages'
import { ManageGroups } from './ManageGroups'
import { ManageAirlineQuotes } from './ManageAirlineQuotes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShieldCheck, Users, Package, Compass, Plane } from 'lucide-react'

export default function AdminDashboard() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('leads')

  if (loading) return null
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-amber-600" /> Painel de Administração
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Gestão de Leads Kanban, Pacotes e Grupos de Turismo.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-200/80 p-1 rounded-xl">
          <TabsTrigger value="leads" className="gap-2 font-bold">
            <Users className="w-4 h-4" /> Kanban de Leads
          </TabsTrigger>
          <TabsTrigger value="pacotes" className="gap-2 font-bold">
            <Package className="w-4 h-4" /> Pacotes
          </TabsTrigger>
          <TabsTrigger value="grupos" className="gap-2 font-bold">
            <Compass className="w-4 h-4" /> Grupos
          </TabsTrigger>
          <TabsTrigger value="cotacoes" className="gap-2 font-bold">
            <Plane className="w-4 h-4" /> Cotações Aéreas
          </TabsTrigger>
        </TabsList>

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
