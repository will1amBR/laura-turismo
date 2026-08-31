import { Sparkles, CheckCircle2, Circle, Clock, Plane, FileText, Check } from 'lucide-react'

export interface GroupTimelineProps {
  status: 'em_formacao' | 'confirmado' | 'em_andamento' | 'finalizado'
  hasSchedule?: boolean
}

export function GroupTimeline({ status, hasSchedule = false }: GroupTimelineProps) {
  const steps = [
    {
      id: 'em_formacao',
      label: 'Em Formação',
      description: 'Aguardando interessados',
      icon: Clock,
      activeColor: 'from-amber-400 to-amber-500',
      activeBorder: 'border-amber-400',
      activeText: 'text-amber-600 dark:text-amber-400',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      emoji: '🟡',
    },
    {
      id: 'confirmado',
      label: 'Confirmado',
      description: 'Grupo fechado',
      icon: CheckCircle2,
      activeColor: 'from-emerald-400 to-emerald-600',
      activeBorder: 'border-emerald-500',
      activeText: 'text-emerald-600 dark:text-emerald-400',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      emoji: '🟢',
    },
    {
      id: 'roteiro',
      label: 'Roteiro Definido',
      description: 'Dias e atividades prontas',
      icon: FileText,
      activeColor: 'from-sky-400 to-sky-600',
      activeBorder: 'border-sky-500',
      activeText: 'text-sky-600 dark:text-sky-400',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      emoji: '📋',
    },
    {
      id: 'em_andamento',
      label: 'Em Andamento',
      description: 'Viagem acontecendo',
      icon: Plane,
      activeColor: 'from-orange-500 to-amber-600',
      activeBorder: 'border-orange-500',
      activeText: 'text-orange-600 dark:text-orange-400',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      emoji: '✈️',
    },
    {
      id: 'finalizado',
      label: 'Finalizado',
      description: 'Viagem concluída',
      icon: Check,
      activeColor: 'from-teal-600 to-teal-800',
      activeBorder: 'border-teal-700',
      activeText: 'text-teal-700 dark:text-teal-400',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      emoji: '✅',
    },
  ]

  const getCurrentStepIndex = () => {
    if (status === 'em_formacao') return 0
    if (status === 'confirmado' && !hasSchedule) return 1
    if (status === 'confirmado' && hasSchedule) return 2
    if (status === 'em_andamento') return 3
    if (status === 'finalizado') return 4
    return 0
  }

  const currentIdx = getCurrentStepIndex()
  const progressPercent = (currentIdx / (steps.length - 1)) * 100

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/15 shadow-inner transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-teal-100">
            Linha do Tempo da Viagem
          </span>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur">
          Etapa {currentIdx + 1} de {steps.length}:{' '}
          <span className="font-extrabold">{steps[currentIdx].label}</span>
        </div>
      </div>
      {/* Progress Line */}
      <div className="relative my-4 sm:my-6 overflow-hidden sm:overflow-visible">
        {/* Background Track */}
        <div className="absolute top-5 md:top-6 left-4 right-4 h-1.5 -translate-y-1/2 bg-white/20 rounded-full z-0" />

        {/* Active Track with Smooth Transition */}
        <div
          className="absolute top-5 md:top-6 left-4 h-1.5 -translate-y-1/2 bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 rounded-full z-0 transition-all duration-700 ease-out"
          style={{ width: `calc(${progressPercent}% * 0.9 + 8px)` }}
        />

        {/* Steps Nodes */}
        <div className="relative z-10 flex justify-between items-start gap-1">
          {steps.map((step, idx) => {
            const isDone = idx < currentIdx
            const isCurrent = idx === currentIdx
            const Icon = step.icon

            return (
              <div
                key={step.id}
                className="flex flex-col items-center group relative min-w-0 flex-1"
              >
                {/* Node Circle */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg shrink-0 ${
                    isDone
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white ring-2 sm:ring-4 ring-emerald-400/30 scale-100'
                      : isCurrent
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 ring-2 sm:ring-4 ring-amber-300/60 scale-105 sm:scale-110'
                        : 'bg-slate-800/80 text-slate-400 border-2 border-white/20'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  ) : isCurrent ? (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.5]" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 opacity-40" />
                  )}
                </div>

                {/* Step Label below */}
                <div className="mt-2 text-center w-full min-w-0 px-0.5">
                  <p
                    className={`text-[9px] sm:text-[10px] md:text-xs font-bold leading-tight truncate transition-colors ${
                      isDone
                        ? 'text-emerald-300'
                        : isCurrent
                          ? 'text-amber-300 font-extrabold drop-shadow'
                          : 'text-slate-400'
                    }`}
                  >
                    <span className="sm:hidden">{step.emoji}</span>{' '}
                    <span className="hidden sm:inline">{step.label}</span>
                  </p>
                  <p className="hidden md:block text-[9px] text-teal-200/70 mt-0.5 leading-tight truncate">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>{' '}
    </div>
  )
}
