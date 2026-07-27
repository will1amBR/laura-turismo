import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Compass, Calendar, ChevronRight, CheckCircle2, Clock } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { getUserMemberships, GroupMemberRecord } from '@/services/members'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function MyGroups() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [memberships, setMemberships] = useState<GroupMemberRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserMemberships(user.id)
      .then(setMemberships)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'em_formacao':
        return <Badge className="bg-amber-500 text-slate-950 font-semibold">Em formação</Badge>
      case 'confirmado':
        return <Badge className="bg-emerald-600 text-white font-semibold">Confirmado</Badge>
      case 'em_andamento':
        return <Badge className="bg-blue-600 text-white font-semibold">Em andamento</Badge>
      case 'finalizado':
        return <Badge className="bg-slate-500 text-white">Finalizado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <Compass className="w-8 h-8 text-teal-700" /> Meus Grupos de Viagem
        </h1>
        <p className="text-slate-600 mt-1">
          Acompanhe suas inscrições, status de aprovação e roteiros das viagens.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : memberships.length === 0 ? (
        <Card className="p-12 text-center space-y-4 border-dashed bg-white">
          <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Você ainda não está inscrito em nenhum grupo
          </h3>
          <p className="text-slate-600 max-w-md mx-auto text-sm">
            Navegue pelos pacotes disponíveis, escolha a melhor data e entre em um grupo em
            formação!
          </p>
          <Button
            onClick={() => navigate('/#pacotes')}
            className="bg-teal-700 hover:bg-teal-800 font-semibold"
          >
            Ver Pacotes Disponíveis
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memberships.map((item) => {
            const group = item.expand?.group
            if (!group) return null

            return (
              <Card key={item.id} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl text-slate-900">{group.name}</CardTitle>
                      <p className="text-xs text-slate-500 mt-1">{group.expand?.package?.title}</p>
                    </div>
                    {getStatusBadge(group.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-slate-600 space-y-1">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      {formatDate(group.start_date)} até {formatDate(group.end_date)}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-slate-500">Inscrição:</span>
                      {item.status === 'aprovado' ? (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Aprovada
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Aguardando aprovação
                        </span>
                      )}
                    </div>
                  </div>

                  <Link to={`/grupo/${group.id}`}>
                    <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2">
                      Ver detalhes do grupo <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
