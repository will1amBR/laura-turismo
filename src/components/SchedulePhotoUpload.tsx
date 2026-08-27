import { useState } from 'react'
import { uploadSchedulePhotos } from '@/services/schedules'
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
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) return
    setLoading(true)
    try {
      await uploadSchedulePhotos(scheduleId, files)
      toast({ title: `${files.length} foto(s) enviada(s) com sucesso!` })
      setOpen(false)
      setFiles([])
    } catch {
      toast({ title: 'Erro ao enviar fotos', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs text-slate-500 hover:text-teal-700"
        >
          <ImagePlus className="w-3.5 h-3.5" /> Fotos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Fotos ao Roteiro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpload} className="space-y-4 pt-2">
          <div>
            <Label>Selecione uma ou mais fotos (JPG, PNG, WEBP)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files))
                }
              }}
            />
            {files.length > 0 && (
              <p className="text-xs text-teal-700 font-semibold mt-1">
                {files.length} foto(s) selecionada(s)
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={files.length === 0 || loading}
            className="w-full bg-teal-700 text-white font-bold"
          >
            {loading
              ? 'Enviando...'
              : `Enviar ${files.length > 1 ? `${files.length} fotos` : 'foto'}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
