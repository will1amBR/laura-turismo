import { useState } from 'react'
import { uploadSchedulePhoto } from '@/services/schedules'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImagePlus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export function SchedulePhotoUpload({ scheduleId }: { scheduleId: string }) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    try {
      await uploadSchedulePhoto(scheduleId, file)
      toast({ title: 'Foto enviada com sucesso!' })
      setOpen(false)
      setFile(null)
    } catch {
      toast({ title: 'Erro ao enviar foto', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-xs text-slate-500">
          <ImagePlus className="w-3.5 h-3.5" /> Foto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar foto do destino</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpload} className="space-y-4 pt-2">
          <div>
            <Label>Imagem (máx. 5MB)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <Button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-teal-700 text-white"
          >
            {loading ? 'Enviando...' : 'Enviar foto'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
