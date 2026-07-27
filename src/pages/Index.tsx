import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Users,
  CreditCard,
  ChevronRight,
  Star,
  ShieldCheck,
  Sparkles,
  MapPin,
} from 'lucide-react'
import { getPackages, PackageRecord, getPackageImageUrl } from '@/services/packages'
import { formatCurrency } from '@/lib/utils'
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
import { LeadModal } from '@/components/LeadModal'

export default function Index() {
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPackages()
      .then(setPackages)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-950 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <Badge className="bg-amber-400 text-slate-950 font-bold px-3 py-1 text-sm border-none shadow">
                <Sparkles className="w-4 h-4 mr-1 inline" /> Grupos Exclusivos para o Chile
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Viaje para o Chile com a Laura
              </h1>
              <p className="text-lg md:text-xl text-teal-100 font-light leading-relaxed">
                Pacotes completos em grupos pequenos. Conheça as paisagens deslumbrantes do Chile
                com roteiros planejados, total segurança e acolhimento em cada detalhe.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#pacotes">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 shadow-lg"
                  >
                    Ver Pacotes
                  </Button>
                </a>
                <a href="#como-funciona">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Como Funciona
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://img.usecurling.com/p/800/500?q=chile%20landscape&color=blue"
                  alt="Chile Torres del Paine"
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur text-white p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-amber-400" /> Chile - Santiago & Atacama
                    </p>
                    <p className="text-xs text-slate-300">Próxima saída em Março/2025</p>
                  </div>
                  <LeadModal triggerText="Garanta sua vaga" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="container mx-auto px-4 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-2 border-teal-600 text-teal-700">
            Passo a Passo
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900">Como funciona a viagem em grupo?</h2>
          <p className="text-slate-600 mt-2">
            Viajar em grupo é economizar e fazer novas amizades sem se preocupar com logística.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-elevation text-center space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">1. Escolha o Pacote</h3>
            <p className="text-slate-600 text-sm">
              Navegue pelas opções de itinerários: Santiago histórico, vinícolas, neve ou o incrível
              Deserto do Atacama.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-elevation text-center space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">2. Entre num Grupo</h3>
            <p className="text-slate-600 text-sm">
              Selecione uma data com grupo em formação. Ao atingir o número mínimo, a viagem é
              confirmada!
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-elevation text-center space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">3. Taxa de Interesse & Embarque</h3>
            <p className="text-slate-600 text-sm">
              Pague a taxa de interesse para reservar seu lugar. Você receberá o roteiro completo no
              seu painel.
            </p>
          </div>
        </div>
      </section>

      {/* Pacotes Section */}
      <section id="pacotes" className="container mx-auto px-4 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="outline" className="mb-2 border-teal-600 text-teal-700">
              Roteiros Exclusivos
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">Pacotes em Destaque</h2>
          </div>
          <LeadModal triggerText="Dúvidas sobre os roteiros?" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getPackageImageUrl(pkg)}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-slate-950/80 backdrop-blur text-white text-sm px-3 py-1 font-semibold">
                      {pkg.duration_days} dias
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900 group-hover:text-teal-700 transition-colors">
                    {pkg.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm text-slate-600">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500">A partir de</span>
                    <span className="text-2xl font-extrabold text-teal-800">
                      {formatCurrency(pkg.price_cents)}
                    </span>
                    <span className="text-xs text-slate-500">/ pessoa</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to={`/pacote/${pkg.id}`} className="w-full">
                    <Button className="w-full bg-teal-700 hover:bg-teal-800 font-semibold gap-2">
                      Ver detalhes do pacote <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Depoimentos Section */}
      <section className="bg-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">Quem viajou recomenda!</h2>
            <p className="text-teal-200 mt-2">
              Depoimentos de clientes reais que viveram o Chile com a Laura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-teal-800/60 p-6 rounded-2xl border border-teal-700/50 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic">
                "A viagem para Santiago foi impecável! A Laura cuidou de todos os detalhes, fiz
                amizades incríveis no grupo e os passeios foram super pontuais."
              </p>
              <div>
                <p className="font-bold text-white text-sm">Juliana & Rogério</p>
                <p className="text-xs text-teal-300">Grupo Santiago - Novembro/2024</p>
              </div>
            </div>

            <div className="bg-teal-800/60 p-6 rounded-2xl border border-teal-700/50 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic">
                "Viajar sozinha no grupo da Laura me deu uma segurança enorme. O Deserto do Atacama
                é mágico e ter o roteiro guiado fez toda diferença!"
              </p>
              <div>
                <p className="font-bold text-white text-sm">Fernanda Costa</p>
                <p className="text-xs text-teal-300">Grupo Atacama - Outubro/2024</p>
              </div>
            </div>

            <div className="bg-teal-800/60 p-6 rounded-2xl border border-teal-700/50 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic">
                "Melhor agência para o Chile. Restaurantes bem selecionados, traslados novinhos e
                suporte direto no WhatsApp. Recomendo de olhos fechados!"
              </p>
              <div>
                <p className="font-bold text-white text-sm">Marcos Vinícius</p>
                <p className="text-xs text-teal-300">Grupo Chile Essential - Dezembro/2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="container mx-auto px-4">
        <div className="bg-amber-400 rounded-3xl p-8 md:p-12 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Pronto para a sua próxima aventura?
            </h3>
            <p className="text-slate-900 font-medium">
              Entre em contato hoje e escolha a data perfeita para sua viagem.
            </p>
          </div>
          <LeadModal triggerText="Quero Falar com Atendimento" />
        </div>
      </section>
    </div>
  )
}
