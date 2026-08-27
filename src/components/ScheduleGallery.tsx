import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ScheduleGalleryProps {
  photos: string[]
  title: string
}

export function ScheduleGallery({ photos, title }: ScheduleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!photos || photos.length === 0) return null

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-2">
      {/* Main Image Banner / Carousel */}
      <div
        className="relative group w-full h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-stone-900"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={photos[currentIndex]}
          alt={`${title} - Foto ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur">
            <Maximize2 className="w-3.5 h-3.5" /> Clique para ampliar
          </span>
        </div>

        {/* Carousel Arrows (if > 1 photo) */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all backdrop-blur shadow opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all backdrop-blur shadow opacity-80 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(idx)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-white shadow'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Counter Badge */}
        {photos.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>

      {/* Thumbnails row if multiple */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {photos.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-teal-600 scale-105 shadow'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-0 text-white shadow-2xl overflow-hidden">
          <div className="relative flex flex-col items-center justify-center min-h-[50vh] max-h-[85vh] p-4">
            <img
              src={photos[currentIndex]}
              alt={`${title} - Foto ampliada ${currentIndex + 1}`}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
            />

            {/* Navigation inside Lightbox */}
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full h-12 w-12"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full h-12 w-12"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
                <div className="absolute bottom-4 text-center text-xs text-white/80">
                  Foto {currentIndex + 1} de {photos.length} — {title}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
