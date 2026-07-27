import { useState } from 'react'
import { createLead } from '@/services/leads'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { PhoneCall } from 'lucide-react'

export function LeadModal({ triggerText = 'Falar com a Laura' }: { triggerText?: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [origem, setOrigem] = useState<'indicacao' | 'instagram' | 'site' | 'outros'>('site')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await createLead({
        name,
        phone,
        origem,
        status: 'novo',
        notes,
      })
      toast({
        title: 'Solicitação enviada com sucesso!',
        description: 'A equipe da Laura entrará em contato em breve via WhatsApp.',
      })
      setName('')
      setPhone('')
      setNotes('')
      setOpen(false)
    } catch {
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente em instantes.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold gap-2 shadow-md">
          <PhoneCall className="h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-teal-800">Fale com a Laura Turismo</DialogTitle>
          <DialogDescription>
            Deixe seus dados e entraremos em contato com orçamentos e detalhes dos grupos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="name">Seu Nome Completo *</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Telefone / WhatsApp</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-8888"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="origem">Como nos conheceu?</Label>
            <Select value={origem} onValueChange={(val: any) => setOrigem(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site">Site oficial</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="indicacao">Indicação de amigo</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="notes">Mensagem / Quando quer viajar?</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Quero ir em Março com meu esposo..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium"
          >
            {loading ? 'Enviando...' : 'Enviar Solicitação'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
