import { useState } from 'react'
import { Search, Calendar, MapPin, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FlightFilterValues {
  departureDate: string
  returnDate: string
  departureAirport: string
  arrivalAirport: string
}

export const DEPARTURE_AIRPORTS = [
  'Rio de Janeiro – Galeão (GIG)',
  'Rio de Janeiro – Santos Dumont (SDU)',
  'São Paulo – Guarulhos (GRU)',
  'São Paulo – Congonhas (CGH)',
  'São Paulo – Viracopos (VCP)',
]

const ARRIVAL_AIRPORTS = [
  'Santiago (SCL)',
  'Puerto Montt (PMC)',
  'Punta Arenas (PUQ)',
  'Calama (CJC)',
  'Antofagasta (ANF)',
]

export function FlightSearchFilter({
  onSearch,
  onReset,
}: {
  onSearch: (values: FlightFilterValues) => void
  onReset: () => void
}) {
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [departureAirport, setDepartureAirport] = useState('all')
  const [arrivalAirport, setArrivalAirport] = useState('all')

  const handleSearch = () => {
    onSearch({
      departureDate,
      returnDate,
      departureAirport: departureAirport === 'all' ? '' : departureAirport,
      arrivalAirport: arrivalAirport === 'all' ? '' : arrivalAirport,
    })
  }

  const handleReset = () => {
    setDepartureDate('')
    setReturnDate('')
    setDepartureAirport('all')
    setArrivalAirport('all')
    onReset()
  }

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8 shadow-2xl animate-fade-in-up">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-sky-600 text-white rounded-xl flex items-center justify-center shadow-lg">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white drop-shadow">Encontre seu próximo grupo</h2>
          <p className="text-xs text-white/70">Filtre por data e aeroporto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-white/90 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Data de Ida
          </Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="bg-white/90 border-white/30 text-stone-800"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-white/90 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Data de Volta
          </Label>
          <Input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="bg-white/90 border-white/30 text-stone-800"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-white/90 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Aeroporto de Saída
          </Label>
          <Select value={departureAirport} onValueChange={setDepartureAirport}>
            <SelectTrigger className="bg-white/90 border-white/30 text-stone-800">
              <SelectValue placeholder="Todos os aeroportos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os aeroportos</SelectItem>
              {DEPARTURE_AIRPORTS.map((airport) => (
                <SelectItem key={airport} value={airport}>
                  {airport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-white/90 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Aeroporto de Chegada
          </Label>
          <Select value={arrivalAirport} onValueChange={setArrivalAirport}>
            <SelectTrigger className="bg-white/90 border-white/30 text-stone-800">
              <SelectValue placeholder="Todos os destinos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os destinos</SelectItem>
              {ARRIVAL_AIRPORTS.map((airport) => (
                <SelectItem key={airport} value={airport}>
                  {airport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold gap-2 flex-1 md:flex-none md:px-12 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <Search className="w-4 h-4" /> Buscar
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="gap-2 border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent"
        >
          <RotateCcw className="w-4 h-4" /> Limpar
        </Button>
      </div>
    </div>
  )
}
