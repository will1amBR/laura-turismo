import { useState } from 'react'
import { Search, Plane, Calendar, MapPin, RotateCcw } from 'lucide-react'
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
import { Card } from '@/components/ui/card'

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
  const [arrivalAirport, setArrivalAirport] = useState('')

  const handleSearch = () => {
    onSearch({
      departureDate,
      returnDate,
      departureAirport: departureAirport === 'all' ? '' : departureAirport,
      arrivalAirport: arrivalAirport.trim(),
    })
  }

  const handleReset = () => {
    setDepartureDate('')
    setReturnDate('')
    setDepartureAirport('all')
    setArrivalAirport('')
    onReset()
  }

  return (
    <Card className="bg-white shadow-xl border-slate-200 rounded-2xl p-6 md:p-8 -mt-20 relative z-20">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 bg-teal-700 text-white rounded-xl flex items-center justify-center">
          <Plane className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Encontre seu próximo grupo</h2>
          <p className="text-xs text-slate-500">Filtre por data e aeroporto de saída</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" /> Data de Ida
          </Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="border-slate-300"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" /> Data de Volta
          </Label>
          <Input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="border-slate-300"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" /> Aeroporto de Saída
          </Label>
          <Select value={departureAirport} onValueChange={setDepartureAirport}>
            <SelectTrigger className="border-slate-300">
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
          <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" /> Aeroporto de Chegada
          </Label>
          <Input
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
            placeholder="Ex: Santiago (SCL)"
            className="border-slate-300"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <Button
          onClick={handleSearch}
          className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 flex-1 md:flex-none md:px-12"
        >
          <Search className="w-4 h-4" /> Buscar
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="gap-2 border-slate-300 text-slate-600"
        >
          <RotateCcw className="w-4 h-4" /> Limpar
        </Button>
      </div>
    </Card>
  )
}
