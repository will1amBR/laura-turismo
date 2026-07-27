import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react'
import { ShieldCheck, CreditCard, CheckCircle, ArrowLeft, Lock } from 'lucide-react'
import { getGroup, GroupRecord } from '@/services/groups'
import { joinGroup } from '@/services/members'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'

export default function Payment() {
  const { groupId } = useParams<{ groupId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [group, setGroup] = useState<GroupRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!groupId) return
    getGroup(groupId)
      .then(setGroup)
      .catch(() => toast({ title: 'Grupo não encontrado', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }, [groupId])

  const handleSimulatePayment = async () => {
    if (!group || !user) return

    setProcessing(true)
    try {
      await joinGroup(group.id, user.id, 'pago')
      toast({
        title: 'Pagamento da taxa simulado com sucesso!',
        description: 'Sua inscrição foi registrada e aguarda aprovação da Laura.',
      })
      navigate(`/grupo/${group.id}`)
    } catch {
      toast({
        title: 'Atenção',
        description: 'Você já está inscrito neste grupo ou ocorreu um erro.',
        variant: 'destructive',
      })
      navigate(`/grupo/${group.id}`)
    } finally {
      setProcessing(false)
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

  const feeCents = 20000 // R$ 200,00 simulated interest fee

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 text-slate-600">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Button>

      <Card className="shadow-xl border-slate-200">
        <CardHeader className="bg-slate-900 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <Badge className="bg-sky-500 text-white font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> MercadoPago Checkout
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Ambiente Seguro
            </span>
          </div>
          <CardTitle className="text-2xl mt-2">Taxa de Interesse do Grupo</CardTitle>
          <CardDescription className="text-slate-300">
            Reserva de vaga para o {group.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <p className="text-xs font-bold uppercase text-slate-500">Resumo da Reserva</p>
            <p className="font-bold text-slate-900 text-lg">{group.name}</p>
            <p className="text-sm text-slate-600">
              Pacote: <span className="font-semibold">{group.expand?.package?.title}</span>
            </p>
            <p className="text-sm text-slate-600">
              Data: {formatDate(group.start_date)} até {formatDate(group.end_date)}
            </p>
          </div>

          {/* Pricing detail */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div>
              <p className="font-bold text-slate-900">Taxa de Reserva de Vaga</p>
              <p className="text-xs text-slate-500">Abatida do valor total do pacote</p>
            </div>
            <div className="text-2xl font-black text-teal-800">{formatCurrency(feeCents)}</div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 leading-relaxed">
            💡 <strong>Nota de Simulação:</strong> Esta é uma demonstração integrativa. Ao clicar no
            botão abaixo, a taxa de reserva será simulada com status "Pago" no MercadoPago.
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 p-6 rounded-b-xl flex flex-col gap-3">
          <Button
            onClick={handleSimulatePayment}
            disabled={processing}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-base py-6 shadow-md gap-2"
          >
            <CreditCard className="w-5 h-5" />
            {processing ? 'Processando...' : 'Pagar Taxa com MercadoPago'}
          </Button>
          <p className="text-xs text-center text-slate-500">
            Ao confirmar, você será redirecionado para a página do seu grupo.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
