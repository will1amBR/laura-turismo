import { useMemo } from 'react'
import { Clock, Calendar, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface GroupCountdownBadgeProps {
  startDateStr?: string
  endDateStr?: string
  status?: string
  compact?: boolean
}

export function GroupCountdownBadge({
  startDateStr,
  endDateStr,
  status,
  compact = false,
}: GroupCountdownBadgeProps) {
  const countdownInfo = useMemo(() => {
    if (!startDateStr) return null

    try {
      const now = new Date()
      // Reset hours to compare purely by date
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
      const start = new Date(startDateStr)
      const startDateOnly = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
      ).getTime()

      let endDateOnly: number | null = null
      if (endDateStr) {
        const end = new Date(endDateStr)
        endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
      }

      const diffTime = startDateOnly - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (status === 'finalizado') {
        return {
          type: 'finalizado',
          label: 'Viagem Finalizada',
          color: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: Clock,
          urgent: false,
        }
      }

      if (diffDays < 0) {
        // Se a data final ainda não passou
        if (endDateOnly && today <= endDateOnly) {
          return {
            type: 'em_andamento',
            label: 'Em andamento agora',
            color: 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse',
            icon: Calendar,
            urgent: false,
          }
        }
        return {
          type: 'finalizado',
          label: 'Viagem Finalizada',
          color: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: Clock,
          urgent: false,
        }
      }

      if (diffDays === 0) {
        return {
          type: 'hoje',
          label: 'Embarque hoje!',
          color: 'bg-rose-500 text-white border-rose-600 animate-bounce',
          icon: AlertCircle,
          urgent: true,
        }
      }

      if (diffDays <= 7) {
        return {
          type: 'urgente',
          label: `Faltam apenas ${diffDays} dia${diffDays > 1 ? 's' : ''}!`,
          color: 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold shadow-sm',
          icon: AlertCircle,
          urgent: true,
        }
      }

      if (diffDays <= 30) {
        return {
          type: 'dias',
          label: `Faltam ${diffDays} dias para a viagem`,
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: Clock,
          urgent: false,
        }
      }

      const weeks = Math.floor(diffDays / 7)
      const months = Math.floor(diffDays / 30)

      if (months >= 2) {
        return {
          type: 'meses',
          label: `Embarque em ~${months} meses (${diffDays} dias)`,
          color: 'bg-teal-50 text-teal-800 border-teal-200',
          icon: Calendar,
          urgent: false,
        }
      }

      return {
        type: 'semanas',
        label: `Embarque em ${weeks} semanas (${diffDays} dias)`,
        color: 'bg-sky-50 text-sky-800 border-sky-200',
        icon: Calendar,
        urgent: false,
      }
    } catch {
      return null
    }
  }, [startDateStr, endDateStr, status])

  if (!countdownInfo) return null

  const Icon = countdownInfo.icon

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 transition-all ${countdownInfo.color} ${
        compact ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
    >
      <Icon className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{countdownInfo.label}</span>
    </Badge>
  )
}
