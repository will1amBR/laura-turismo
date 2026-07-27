import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Testimonial {
  name: string
  trip: string
  quote: string
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Juliana & Rogério',
    trip: 'Grupo Santiago - Novembro/2024',
    quote:
      'A viagem para Santiago foi impecável! A Laura cuidou de todos os detalhes, fiz amizades incríveis no grupo e os passeios foram super pontuais.',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
  },
  {
    name: 'Fernanda Costa',
    trip: 'Grupo Atacama - Outubro/2024',
    quote:
      'Viajar sozinha no grupo da Laura me deu uma segurança enorme. O Deserto do Atacama é mágico e ter o roteiro guiado fez toda diferença!',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
  },
  {
    name: 'Marcos Vinícius',
    trip: 'Grupo Chile Essential - Dezembro/2024',
    quote:
      'Melhor agência para o Chile. Restaurantes bem selecionados, traslados novinhos e suporte direto no WhatsApp. Recomendo de olhos fechados!',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
  },
  {
    name: 'Patricia Almeida',
    trip: 'Grupo Patagônia - Janeiro/2025',
    quote:
      'Experiência transformadora! Cada dia tinha uma surpresa diferente. Os guias são super atenciosos e o grupo virou família.',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
  },
  {
    name: 'Ricardo Souza',
    trip: 'Grupo Vinícolas - Fevereiro/2025',
    quote:
      'Sempre sonhei em conhecer os vinhos chilenos. A Laura montou um roteiro perfeito, visitando vinícolas incríveis com degustação exclusiva!',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=2',
  },
]

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const clampedIndex = Math.max(0, Math.min(index, TESTIMONIALS.length - 1))
    const cardWidth = container.scrollWidth / TESTIMONIALS.length
    container.scrollTo({ left: cardWidth * clampedIndex, behavior: 'smooth' })
    setCurrentIndex(clampedIndex)
  }, [])

  const next = useCallback(() => {
    scrollToIndex(currentIndex + 1 >= TESTIMONIALS.length ? 0 : currentIndex + 1)
  }, [currentIndex, scrollToIndex])

  const prev = useCallback(() => {
    scrollToIndex(currentIndex - 1 < 0 ? TESTIMONIALS.length - 1 : currentIndex - 1)
  }, [currentIndex, scrollToIndex])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, next])

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const cardWidth = container.scrollWidth / TESTIMONIALS.length
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%]"
          >
            <div className="bg-white rounded-2xl border border-stone-200 shadow-elevation p-6 space-y-4 h-full">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-stone-600 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                  <p className="text-xs text-stone-400">{t.trip}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full border-stone-300 hover:bg-amber-50 hover:border-amber-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                i === currentIndex
                  ? 'w-8 bg-gradient-to-r from-amber-500 to-sky-600'
                  : 'w-2.5 bg-stone-300 hover:bg-stone-400',
              )}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full border-stone-300 hover:bg-amber-50 hover:border-amber-400"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
