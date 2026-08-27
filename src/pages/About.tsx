import { Link } from 'react-router-dom'
import {
  Heart,
  Users,
  Compass,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Phone,
  Calendar,
  MapPin,
  Star,
  Quote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { LeadModal } from '@/components/LeadModal'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'

export default function About() {
  const differentials = [
    {
      icon: Users,
      title: 'Grupos Pequenos e Exclusivos',
      desc: 'Viagens em turmas reduzidas (5 a 12 pessoas) garantindo mais atenção, convivência agradável e flexibilidade nos passeios.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Compass,
      title: 'Curadoria de Experiências',
      desc: 'Cada vinícola, restaurante e mirante é escolhido a dedo com base em anos de vivência no Chile, fugindo de armadilhas para turistas.',
      color: 'from-sky-500 to-blue-600',
    },
    {
      icon: ShieldCheck,
      title: 'Suporte Completo do Início ao Fim',
      desc: 'Da escolha do voo ao embarque e retorno para o Brasil. Você nunca viaja sozinho ou desamparado.',
      color: 'from-emerald-500 to-teal-700',
    },
    {
      icon: Award,
      title: '15+ Anos de Especialização',
      desc: 'Conhecimento profundo das montanhas dos Andes, Valle Nevado, Cajón del Maipo, Atacama e Lagos Andinos.',
      color: 'from-purple-500 to-indigo-600',
    },
  ]

  const highlights = [
    'Mais de 15 anos transformando sonhos em viagens inesquecíveis',
    'Centenas de grupos conduzidos com 100% de satisfação',
    'Parceiros locais certificados no Chile (hotéis, guias, transportes)',
    'Roteiros desenhados no ritmo certo: sem correria, com vivência autêntica',
  ]

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/40 px-4 py-1.5 text-sm font-bold">
              <Sparkles className="w-4 h-4 mr-1 inline" /> Nossa História & Paixão
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Sobre a{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                Laura Turismo
              </span>
            </h1>
            <p className="text-lg md:text-xl text-teal-100/90 leading-relaxed font-light">
              Especialistas em conectar viajantes brasileiros às mais deslumbrantes paisagens do
              Chile com segurança, conforto e afeto.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Laura Portrait */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Laura Photo / Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Decorative backdrops */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500 to-sky-600 rounded-3xl blur-lg opacity-30 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="https://img.usecurling.com/ppl/large?gender=female&seed=42"
                  alt="Laura - Fundadora da Laura Turismo"
                  className="w-full h-[450px] object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 text-white">
                  <p className="text-xl font-bold">Laura Silva</p>
                  <p className="text-sm text-amber-300">Fundadora & Guia Especialista no Chile</p>
                </div>
              </div>
              {/* Badge Experience */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center font-black text-xl">
                  15+
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">Anos de</p>
                  <p className="text-sm font-bold text-stone-900">Experiência Real</p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="outline" className="border-amber-500 text-amber-600">
              Quem é a Laura?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
              Uma trajetória dedicada a fazer você se apaixonar pelo Chile.
            </h2>
            <div className="text-stone-600 space-y-4 text-base leading-relaxed">
              <p>
                <strong>Laura</strong> atua na área de turismo há <strong>mais de 15 anos</strong> e
                leva grupos de turistas para o Chile saindo do Brasil com maestria e paixão. O que
                começou como uma paixão pelas cordilheiras andinas e pela cultura chilena se
                transformou na missão de proporcionar viagens seguras, acolhedoras e sem as
                preocupações típicas de viagens internacionais.
              </p>
              <p>
                Ao longo de mais de uma década e meia, Laura construiu uma sólida rede de parceiros
                locais em Santiago, no Deserto do Atacama, na Patagônia e nos Lagos Andinos. Cada
                itinerário é testado e vivenciado pessoalmente antes de ser apresentado aos
                viajantes.
              </p>
              <p>
                Com Laura Turismo, você não é apenas um número de reserva: você faz parte de um
                grupo exclusivo onde novas amizades nascem e momentos inesquecíveis são
                compartilhados ao redor de um bom vinho chileno.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/5511998170951?text=Ol%C3%A1%20Laura!%20Gostaria%20de%20conversar%20sobre%20as%20viagens."
                target="_blank"
                rel="noreferrer"
              >
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg">
                  <Phone className="w-4 h-4" /> Falar com a Laura no WhatsApp
                </Button>
              </a>
              <Link to="/#pacotes">
                <Button variant="outline" className="border-stone-300 font-semibold">
                  Conhecer os Roteiros
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-stone-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-2 border-amber-500 text-amber-600">
              Nossos Diferenciais
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">
              Por que viajar com a Laura Turismo?
            </h2>
            <p className="text-stone-600 mt-2">
              Cuidado em cada detalhe para que você aproveite o Chile com total tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card
                  key={idx}
                  className="border-stone-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <CardContent className="p-6 space-y-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">{item.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="mb-2 border-amber-500 text-amber-600">
            Depoimentos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">
            O que dizem os nossos viajantes
          </h2>
          <p className="text-stone-600 mt-2">
            A satisfação e o carinho de quem já explorou o Chile com a Laura.
          </p>
        </div>

        <TestimonialsCarousel />
      </section>

      {/* CTA Box */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-amber-950 text-white p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Pronto para viver essa experiência?
            </h3>
            <p className="text-teal-200/90 text-sm md:text-base">
              Vagas limitadas por grupo para garantir exclusividade e atenção total. Tire suas
              dúvidas com a Laura agora mesmo!
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LeadModal triggerText="Solicitar Atendimento" />
          </div>
        </div>
      </section>
    </div>
  )
}
