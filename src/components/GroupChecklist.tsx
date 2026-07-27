import { useEffect, useState } from 'react'
import { getChecklistItems, ChecklistItemRecord } from '@/services/checklist'
import { useRealtime } from '@/hooks/use-realtime'
import { CheckCircle, Circle, ListChecks } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function GroupChecklist({ groupId }: { groupId: string }) {
  const [items, setItems] = useState<ChecklistItemRecord[]>([])
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const loadData = () => {
    getChecklistItems(groupId)
      .then(setItems)
      .catch(() => {})
  }

  useEffect(() => {
    loadData()
  }, [groupId])
  useRealtime('trip_checklist_items', () => {
    loadData()
  })

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (items.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-teal-700" /> Checklist da Viagem
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {items.map((item) => {
          const isChecked = checked.has(item.id)
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 py-1.5 cursor-pointer group"
              onClick={() => toggle(item.id)}
            >
              {isChecked ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 shrink-0 group-hover:text-slate-400" />
              )}
              <span
                className={`text-sm ${isChecked ? 'line-through text-slate-400' : 'text-slate-700'}`}
              >
                {item.item}
              </span>
              {item.is_required && (
                <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  Obrigatório
                </Badge>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
