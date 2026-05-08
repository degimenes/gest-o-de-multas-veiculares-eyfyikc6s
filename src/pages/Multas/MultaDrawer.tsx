import { Multa, StatusMulta } from '@/lib/types'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import useMultasStore from '@/stores/useMultasStore'
import { useToast } from '@/hooks/use-toast'

interface MultaDrawerProps {
  multa: Multa | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MultaDrawer({ multa, open, onOpenChange }: MultaDrawerProps) {
  const { updateMulta } = useMultasStore()
  const { toast } = useToast()

  const [status, setStatus] = useState<string>('')
  const [projeto, setProjeto] = useState<string>('')
  const [obs, setObs] = useState<string>('')

  useEffect(() => {
    if (multa) {
      setStatus(multa.status)
      setProjeto(multa.projeto || '')
      setObs(multa.observacoes || '')
    }
  }, [multa])

  if (!multa) return null

  const handleSave = () => {
    updateMulta(multa.id, { status: status as StatusMulta, projeto, observacoes: obs })
    toast({
      title: 'Multa atualizada',
      description: `A infração AIT ${multa.ait} foi atualizada com sucesso.`,
    })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Detalhes da Multa</SheetTitle>
          <SheetDescription>AIT: {multa.ait}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Placa</p>
              <p className="font-mono font-medium">{multa.placa}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data</p>
              <p className="font-medium">{new Date(multa.data).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Descrição</p>
              <p className="font-medium">{multa.descricao}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Valor a Pagar</p>
              <p className="font-medium text-lg">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  multa.valorPagar,
                )}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PO lançada / Pago">PO lançada / Pago</SelectItem>
                  <SelectItem value="Aguardando boleto">Aguardando boleto</SelectItem>
                  <SelectItem value="Aguard. notif. penalidade">
                    Aguard. notif. penalidade
                  </SelectItem>
                  <SelectItem value="Condutor pendente">Condutor pendente</SelectItem>
                  <SelectItem value="Recurso em andamento">Recurso em andamento</SelectItem>
                  <SelectItem value="Vencida / Urgente">Vencida / Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Projeto Vinculado</Label>
              <Input
                value={projeto}
                onChange={(e) => setProjeto(e.target.value)}
                placeholder="Ex: 24-0234"
              />
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                placeholder="Detalhes adicionais, justificativas..."
                className="resize-none h-24"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
