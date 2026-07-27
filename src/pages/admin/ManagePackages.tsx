import { useEffect, useState } from 'react'
import { getPackages, createPackage, deletePackage, PackageRecord } from '@/services/packages'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Plus, Trash2 } from 'lucide-react'

export function ManagePackages() {
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [duration, setDuration] = useState(7)
  const [price, setPrice] = useState(3500)

  const loadPkgs = () => {
    getPackages()
      .then(setPackages)
      .catch(() => {})
  }

  useEffect(() => {
    loadPkgs()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPackage({
        title,
        description: desc,
        duration_days: Number(duration),
        price_cents: Number(price) * 100,
      })
      toast({ title: 'Pacote criado!' })
      setTitle('')
      setDesc('')
      setOpenModal(false)
      loadPkgs()
    } catch {
      toast({ title: 'Erro ao criar pacote', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este pacote?')) return
    try {
      await deletePackage(id)
      toast({ title: 'Pacote excluído' })
      loadPkgs()
    } catch {
      toast({ title: 'Erro ao excluir pacote', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Gestão de Pacotes de Viagem</h2>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-1">
              <Plus className="w-4 h-4" /> Novo Pacote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Pacote</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3 pt-2">
              <div>
                <Label>Título do Pacote</Label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Chile 7 Dias"
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea required value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Duração (Dias)</Label>
                  <Input
                    type="number"
                    required
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Preço por pessoa (R$)</Label>
                  <Input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-teal-700 text-white">
                Salvar Pacote
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-slate-900">{pkg.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500"
                onClick={() => handleDelete(pkg.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p className="line-clamp-2">{pkg.description}</p>
              <div className="flex justify-between items-center pt-2 font-semibold text-slate-900">
                <span>Duração: {pkg.duration_days} dias</span>
                <span className="text-teal-800 text-base">{formatCurrency(pkg.price_cents)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
