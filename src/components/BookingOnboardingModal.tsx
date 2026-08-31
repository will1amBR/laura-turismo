import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  Utensils,
  Bell,
  ListChecks,
  HelpCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

interface BookingOnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupName?: string
  packageTitle?: string
}

export function BookingOnboardingModal({
  open,
  onOpenChange,
  groupName,
  packageTitle,
}: BookingOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    } else {
      onOpenChange(false)
      setCurrentStep(1)
    }
  }

  const handleSkip = () => {
    onOpenChange(false)
    setCurrentStep(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-amber-900 text-white p-6 relative">
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge className="bg-amber-400 text-slate-950 font-extrabold text-xs">
              <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Reserva Confirmada
            </Badge>
            <span className="text-xs text-amber-200/90 font-semibold">
              Passo {currentStep} de {totalSteps}
            </span>
          </div>
          <DialogTitle className="text-2xl font-extrabold text-white">
            {currentStep === 1 && 'Bem-vindo ao Grupo Laura Turismo! 🎉'}
            {currentStep === 2 && 'Como Acompanhar Sua Viagem 🧭'}
            {currentStep === 3 && 'Dúvidas Frequentes & Próximos Passos ❓'}
          </DialogTitle>
          <DialogDescription className="text-teal-100 text-xs mt-1">
            {groupName ? `Grupo: ${groupName}` : 'Sua vaga está garantida!'}
            {packageTitle && ` • ${packageTitle}`}
          </DialogDescription>

          {/* Stepper Dots */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? 'w-8 bg-amber-400'
                    : step < currentStep
                      ? 'w-4 bg-teal-400'
                      : 'w-4 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 space-y-2">
                <h4 className="text-sm font-bold text-teal-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" /> O que acontece agora?
                </h4>
                <p className="text-xs text-teal-900 leading-relaxed">
                  Sua taxa de interesse/reserva foi registrada. Nossa equipe e a própria Laura Silva
                  analisam a formação das vagas para confirmação do grupo.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Etapas do seu grupo:
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">1. Em Formação</p>
                      <p className="text-[11px] text-slate-600">
                        O grupo reúne o número mínimo de viajantes (5 a 12 pessoas).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">2. Confirmado & Roteiro</p>
                      <p className="text-[11px] text-slate-600">
                        A Laura cadastra os dias detalhados, refeições e cotações aéreas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">3. Embarque & Suporte 24h</p>
                      <p className="text-[11px] text-slate-600">
                        Acompanhamento diário com galeria de fotos, checklists e dicas em tempo
                        real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Você terá acesso permanente à <strong>Área do Cliente (Meus Grupos)</strong> com
                todas as ferramentas necessárias:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-teal-700 font-bold text-xs">
                    <Calendar className="w-4 h-4" /> Roteiro Diário
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Atividades de cada dia, horários de saída e pontos turísticos.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                    <Utensils className="w-4 h-4" /> Alimentação
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Quais refeições estão inclusas (café da manhã, almoço, jantar ou livre).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs">
                    <ListChecks className="w-4 h-4" /> Checklist de Viagem
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Documentos obrigatórios (RG/Passaporte), roupas de frio e itens essenciais.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                    <Bell className="w-4 h-4" /> Lembretes & Fotos
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Galeria de fotos do destino e avisos importantes da guia Laura.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                💡 <strong>Dica da Laura:</strong> Salve o comprovante e confira sempre a aba
                "Checklist" antes de arrumar suas malas!
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Perguntas Rápidas:
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-900">Preciso de Passaporte?</p>
                  <p className="text-slate-600 mt-0.5">
                    Não obrigatoriamente! O RG original recente (menos de 10 anos) é aceito na
                    imigração chilena. CNH não é aceita.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-900">E as passagens aéreas?</p>
                  <p className="text-slate-600 mt-0.5">
                    A Laura disponibiliza as melhores cotações dentro da página do seu grupo para
                    compra conjunta ou você pode emitir individualmente.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-900">Como falar com a Laura?</p>
                  <p className="text-slate-600 mt-0.5">
                    Nosso canal direto está sempre aberto via WhatsApp para sanar qualquer dúvida.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/5511998170951?text=Ol%C3%A1%20Laura!%20Acabei%20de%20reservar%20minha%20vaga%20no%20grupo."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow"
              >
                <Phone className="w-3.5 h-3.5" /> Falar agora com a Laura no WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100 flex flex-row items-center justify-between sm:justify-between">
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-500 text-xs">
            {currentStep === totalSteps ? 'Fechar' : 'Pular Tour'}
          </Button>

          <Button
            size="sm"
            onClick={handleNext}
            className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-bold text-xs gap-1 shadow-md"
          >
            {currentStep === totalSteps ? (
              <>
                Entendi, ir para o Grupo <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
              </>
            ) : (
              <>
                Próximo <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
