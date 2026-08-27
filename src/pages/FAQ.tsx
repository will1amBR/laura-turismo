import { Link } from 'react-router-dom'
import {
  HelpCircle,
  Sparkles,
  Phone,
  CheckCircle2,
  FileCheck,
  CreditCard,
  Compass,
  Shield,
  Plane,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadModal } from '@/components/LeadModal'

export default function FAQ() {
  const faqs = [
    {
      id: 'item-1',
      question: 'Preciso de visto para o Chile?',
      answer:
        'Brasileiros NÃO precisam de visto para viagens a turismo de até 90 dias. É necessário apenas apresentar o RG original em bom estado de conservação (emitido há menos de 10 anos) ou o Passaporte válido. CNH (carteira de motorista) NÃO é aceita pela imigração chilena para entrada no país.',
    },
    {
      id: 'item-2',
      question: 'O que está incluso no pacote?',
      answer:
        'Depende do pacote escolhido, mas a maioria dos nossos roteiros inclui hospedagem em hotéis selecionados, todos os transfers terrestres privativos no Chile, passeios descritos no itinerário com ingressos inclusos, guia e acompanhamento contínuo da Laura durante a viagem. Passagens aéreas podem ser cotadas e adquiridas conosco ou separadamente.',
    },
    {
      id: 'item-3',
      question: 'Como funcionam os grupos?',
      answer:
        'Nossos grupos são pensados para oferecer conforto e integração, com no mínimo 5 e no máximo 12 pessoas. As datas são pré-definidas ao longo do ano. Você escolhe a melhor data, realiza o pagamento da taxa de reserva para garantir o seu lugar e, assim que o grupo atinge o número mínimo, a viagem é confirmada!',
    },
    {
      id: 'item-4',
      question: 'Posso personalizar meu roteiro?',
      answer:
        'Sim! Além dos grupos com datas fixas, organizamos roteiros totalmente privativos e personalizados para famílias, casais ou grupos de amigos. Entre em contato diretamente pelo WhatsApp para montarmos uma proposta sob medida.',
    },
    {
      id: 'item-5',
      question: 'Qual a política de cancelamento?',
      answer:
        'A taxa de reserva/interesse não é reembolsável em caso de desistência do passageiro, pois é utilizada para travar tarifas e bloqueios de hotéis e transportes. Para os demais valores da viagem, seguimos rigorosamente a política de cancelamento e reembolso de cada fornecedor envolvido (hotéis, cias aéreas e receptivos locais).',
    },
    {
      id: 'item-6',
      question: 'Preciso de seguro viagem?',
      answer:
        'O seguro viagem internacional é altamente recomendado para cobrir imprevistos médicos, hospitalares e atrasos de bagagem. Caso não possua, indicamos as melhores seguradoras parceiras com desconto especial para nossos viajantes.',
    },
    {
      id: 'item-7',
      question: 'Como faço o pagamento?',
      answer:
        'O pagamento da taxa de reserva de vaga é realizado de forma 100% segura online via MercadoPago (cartão de crédito ou PIX). O saldo restante do pacote pode ser parcelado no cartão de crédito, PIX ou transferência bancária conforme o cronograma informado no momento da confirmação.',
    },
  ]

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-4 relative z-10">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/40 px-4 py-1.5 text-sm font-bold">
            <HelpCircle className="w-4 h-4 mr-1 inline" /> Central de Dúvidas
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Perguntas Frequentes (FAQ)
          </h1>
          <p className="text-teal-100/90 max-w-2xl mx-auto text-base md:text-lg">
            Tudo o que você precisa saber para planejar sua viagem ao Chile com segurança e
            tranquilidade.
          </p>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-stone-200 rounded-2xl px-6 py-2 bg-white shadow-sm data-[state=open]:border-teal-500 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left font-bold text-base md:text-lg text-stone-900 hover:text-teal-700 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 text-sm md:text-base leading-relaxed pt-1 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Help Card */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gradient-to-r from-amber-500 to-sky-600 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-extrabold">Ainda tem alguma dúvida?</h3>
            <p className="text-white/90 text-sm">
              Fale diretamente com a Laura no WhatsApp e tire todas as suas dúvidas agora mesmo!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/5511998170951?text=Ol%C3%A1%20Laura!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20pacotes."
              target="_blank"
              rel="noreferrer"
            >
              <Button className="bg-white hover:bg-stone-100 text-stone-900 font-bold gap-2 shadow">
                <Phone className="w-4 h-4 text-emerald-600" /> WhatsApp
              </Button>
            </a>
            <LeadModal triggerText="Enviar Mensagem" />
          </div>
        </div>
      </section>
    </div>
  )
}
