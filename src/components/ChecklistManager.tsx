import { useEffect, useState } from 'react'
import {
  getChecklistItems,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
  ChecklistItemRecord,
} from '@/services/checklist'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, ArrowUp, ArrowDown, ListChecks } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export function ChecklistManager({ groupId }: { groupId: string }) {
  const [items, setItems] = useState<ChecklistItemRecord[]>([])
  const [open, setOpen] = useState(false)
  const [newItem, setNewItem] = useState('')
  const [isRequired, setIsRequired] = useState(true)

  const loadData = () => {
    getChecklistItems(groupId)
      .then(setItems)
      .catch(() => {})
  }

  useEffect(() => {
    if (open) loadData()
  }, [groupId, open])

  useRealtime('trip_checklist_items', () => {
    if (open) loadData()
  })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    try {
      await createChecklistItem({
        group: groupId,
        item: newItem.trim(),
        is_required: isRequired,
        order: items.length,
      })
      setNewItem('')
      setIsRequired(true)
      loadData()
      toast({ title: 'Item adicionado!' })
    } catch {
      toast({ title: 'Erro ao adicionar item', variant: 'destructive' })
    }
  }

  const handleToggleRequired = async (item: ChecklistItemRecord) => {
    try {
      await updateChecklistItem(item.id, { is_required: !item.is_required })
      loadData()
    } catch {
      toast({ title: 'Erro ao atualizar item', variant: 'destructive' })
    }
  }

  const handleReorder = async (item: ChecklistItemRecord, direction: 'up' | 'down') => {
    const index = items.findIndex((i) => i.id === item.id)
    if (index === -1) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return
    const target = items[targetIndex]
    try {
      await updateChecklistItem(item.id, { order: target.order })
      await updateChecklistItem(target.id, { order: item.order })
      loadData()
    } catch {
      toast({ title: 'Erro ao reordenar', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteChecklistItem(id)
      loadData()
      toast({ title: 'Item removido' })
    } catch {
      toast({ title: 'Erro ao remover item', variant: 'destructive' })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-sm">
          <ListChecks className="w-4 h-4" /> Checklist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Gerenciar Checklist da Viagem</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAdd} className="flex gap-2 items-end">
          <div className="flex-1">
            <Label className="text-xs">Novo item</Label>
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Ex: Passaporte"
            />
          </div>
          <div className="flex items-center gap-2 pb-2">
            <Switch checked={isRequired} onCheckedChange={setIsRequired} />
            <Label className="text-xs">Obrigatório</Label>
          </div>
          <Button type="submit" size="icon" className="bg-teal-700 text-white">
            <Plus className="w-4 h-4" />
          </Button>
        </form>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">Nenhum item ainda.</p>
          ) : (
            items.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                <div className="flex flex-col">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5"
                    disabled={idx === 0}
                    onClick={() => handleReorder(item, 'up')}
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5"
                    disabled={idx === items.length - 1}
                    onClick={() => handleReorder(item, 'down')}
                  >
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                </div>
                <span className="flex-1 text-sm text-slate-700">{item.item}</span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.is_required}
                    onCheckedChange={() => handleToggleRequired(item)}
                  />
                  {item.is_required ? (
                    <Badge
                      variant="outline"
                      className="text-xs bg-red-50 text-red-700 border-red-200"
                    >
                      Obrigatório
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600">
                      Opcional
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
