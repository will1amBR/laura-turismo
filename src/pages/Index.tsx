import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Users,
  CreditCard,
  ChevronRight,
  Star,
  Sparkles,
  MapPin,
  Calendar,
  Plane,
  Compass,
  Heart,
  Phone,
} from 'lucide-react'
import { getPackages, PackageRecord, getPackageImageUrl } from '@/services/packages'
import { getUpcomingGroups, GroupRecord } from '@/services/groups'
import { formatCurrency, formatDate } from '@/lib/utils'
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
import { FlightSearchFilter, FlightFilterValues } from '@/components/FlightSearchFilter'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { Skeleton } from '@/components/ui/skeleton'

function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function PackageCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200">
      <Skeleton className="h-56 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default function Index() {
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [groups, setGroups] = useState<GroupRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FlightFilterValues | null>(null)

  useEffect(() => {
    Promise.all([getPackages(), getUpcomingGroups()])
      .then(([pkgs, grps]) => {
        setPackages(pkgs)
        setGroups(grps)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = useCallback((values: FlightFilterValues) => {
    setFilters(values)
    const resultsSection = document.getElementById('resultados-busca')
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleReset = useCallback(() => {
    setFilters(null)
  }, [])

  const filteredGroups = useMemo(() => {
    if (!filters) return groups
    return groups.filter((g) => {
      if (filters.departureDate && g.start_date) {
        const groupStart = new Date(g.start_date)
        const filterDep = new Date(filters.departureDate)
        if (groupStart < filterDep) return false
      }
      if (filters.returnDate && g.end_date) {
        const groupEnd = new Date(g.end_date)
        const filterRet = new Date(filters.returnDate)
        if (groupEnd > filterRet) return false
      }
      if (
        filters.departureAirport &&
        g.departure_airport &&
        !g.departure_airport.toLowerCase().includes(filters.departureAirport.toLowerCase()) &&
        !filters.departureAirport.toLowerCase().includes(g.departure_airport.toLowerCase())
      ) {
        return false
      }
      if (
        filters.arrivalAirport &&
        g.arrival_airport &&
        !g.arrival_airport.toLowerCase().includes(filters.arrivalAirport.toLowerCase()) &&
        !filters.arrivalAirport.toLowerCase().includes(g.arrival_airport.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [groups, filters])

  const hasActiveFilters =
    filters &&
    (filters.departureDate ||
      filters.returnDate ||
      filters.departureAirport ||
      filters.arrivalAirport)

  const scrollToPackages = () => {
    const section = document.getElementById('pacotes')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center animate-hero-zoom"
            style={{
              backgroundImage:
                "url('https://img.usecurling.com/p/1920/1080?q=chile%20andes%20mountains')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6 animate-fade-in-up">
            <Badge className="bg-white/15 backdrop-blur text-white font-bold px-4 py-1.5 text-sm border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 mr-1 inline" /> Grupos Exclusivos para o Chile
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                Descubra o Chile
              </span>
              <br />
              com a Laura Turismo
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              Pacotes completos em grupos pequenos. Conheça paisagens deslumbrantes com roteiros
              planejados, total segurança e acolhimento em cada detalhe.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              <Button
                size="lg"
                onClick={scrollToPackages}
                className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-bold px-8 shadow-xl transition-all duration-300 hover:scale-105"
              >
                Ver Pacotes <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <a href="#como-funciona">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/40 hover:bg-white/10 bg-transparent"
                >
                  Como Funciona
                </Button>
              </a>
              <a href="tel:+5511998170951">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-emerald-400/60 hover:bg-emerald-500/20 bg-emerald-500/10 backdrop-blur gap-2"
                >
                  <Phone className="w-5 h-5" /> +55 11 99817-0951
                </Button>
              </a>
            </div>
            <a
              href="tel:+5511998170951"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mt-4 text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Fale com Laura: +55 11 99817-0951
            </a>
          </div>

          {/* Search Filter in Hero */}
          <div className="max-w-5xl mx-auto mt-10 md:mt-12">
            <FlightSearchFilter onSearch={handleSearch} onReset={handleReset} />
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {hasActiveFilters && (
        <section id="resultados-busca" className="container mx-auto px-4 py-16 scroll-mt-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge variant="outline" className="mb-2 border-amber-500 text-amber-600">
                Resultados da Busca
              </Badge>
              <h2 className="text-2xl font-bold text-stone-900">
                {filteredGroups.length} grupo{filteredGroups.length !== 1 ? 's' : ''} encontrado
                {filteredGroups.length !== 1 ? 's' : ''}
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : filteredGroups.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Plane className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-500 font-medium">
                Nenhum grupo encontrado com os filtros selecionados.
              </p>
              <p className="text-sm text-stone-400 mt-1">Tente ajustar as datas ou aeroportos.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card
                  key={group.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-stone-200 group flex flex-col"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-stone-900 group-hover:text-amber-600 transition-colors">
                        {group.name}
                      </CardTitle>
                      <Badge className="bg-amber-500 text-white">Em Formação</Badge>
                    </div>
                    {group.expand?.package && (
                      <CardDescription className="text-sm text-stone-600 font-medium">
                        {group.expand.package.title}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      {formatDate(group.start_date)} — {formatDate(group.end_date)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.departure_airport && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-sky-50 text-sky-700 border-sky-200"
                        >
                          <Plane className="w-3 h-3 mr-1" /> {group.departure_airport}
                        </Badge>
                      )}
                      {group.arrival_airport && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-amber-50 text-amber-700 border-amber-200"
                        >
                          <MapPin className="w-3 h-3 mr-1" /> {group.arrival_airport}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Users className="w-4 h-4 text-sky-600" />
                      {group.current_members} / {group.capacity} vagas preenchidas
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link to={`/grupo/${group.id}`} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 font-semibold gap-2">
                        Ver detalhes <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="bg-stone-50 py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-2 border-amber-500 text-amber-600">
              Passo a Passo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">
              <span className="bg-gradient-to-r from-amber-500 to-sky-600 bg-clip-text text-transparent">
                Como funciona a viagem em grupo?
              </span>
            </h2>
            <p className="text-stone-600 mt-3">
              Viajar em grupo é economizar e fazer novas amizades sem se preocupar com logística.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={0}>
              <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-elevation text-center space-y-4 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">1. Escolha o Pacote</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Navegue pelas opções de itinerários: Santiago histórico, vinícolas, neve ou o
                  incrível Deserto do Atacama.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-elevation text-center space-y-4 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">2. Junte-se ao Grupo</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Selecione uma data com grupo em formação. Ao atingir o número mínimo, a viagem é
                  confirmada!
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-elevation text-center space-y-4 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Plane className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">3. Viaje Conosco</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Pague a taxa de interesse para reservar seu lugar. Você receberá o roteiro
                  completo no seu painel.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PACOTES */}
      <section id="pacotes" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="outline" className="mb-2 border-amber-500 text-amber-600">
              Roteiros Exclusivos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">
              <span className="bg-gradient-to-r from-amber-500 to-sky-600 bg-clip-text text-transparent">
                Pacotes em Destaque
              </span>
            </h2>
          </div>
          <LeadModal triggerText="Dúvidas sobre os roteiros?" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <PackageCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="overflow-hidden border-stone-200 group flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getPackageImageUrl(pkg)}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/60 backdrop-blur text-white text-sm px-3 py-1 font-semibold">
                      {pkg.duration_days} dias
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-stone-900 group-hover:text-amber-600 transition-colors">
                    {pkg.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm text-stone-600">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-stone-500">A partir de</span>
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-sky-700 bg-clip-text text-transparent">
                      {formatCurrency(pkg.price_cents)}
                    </span>
                    <span className="text-xs text-stone-500">/ pessoa</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to={`/pacote/${pkg.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 font-semibold gap-2 transition-all duration-300 hover:shadow-lg">
                      Ver Detalhes <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-stone-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="outline" className="mb-2 border-amber-500 text-amber-600">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">
              <span className="bg-gradient-to-r from-amber-500 to-sky-600 bg-clip-text text-transparent">
                Quem viajou recomenda!
              </span>
            </h2>
            <p className="text-stone-600 mt-3">
              Depoimentos de clientes reais que viveram o Chile com a Laura.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-sky-600 p-8 md:p-12 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-extrabold">
                Pronto para a sua próxima aventura?
              </h3>
              <p className="text-white/80 font-medium">
                Entre em contato hoje e escolha a data perfeita para sua viagem.
              </p>
            </div>
            <LeadModal triggerText="Quero Falar com Atendimento" />
          </div>
        </div>
      </section>
    </div>
  )
}
