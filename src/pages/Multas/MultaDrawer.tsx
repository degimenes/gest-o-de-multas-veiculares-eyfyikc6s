import { Multa, StatusMulta } from '@/lib/types'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { updateMulta } from '@/services/multas'
import { useToast } from '@/hooks/use-toast'

interface MultaDrawerProps {
  multa: Multa | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MultaDrawer({ multa, open, onOpenChange }: MultaDrawerProps) {
  const { toast } = useToast()

  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    if (multa) {
      setStatus(multa.status)
    }
  }, [multa])

  if (!multa) return null

  const handleSave = async () => {
    try {
      await updateMulta(multa.id, { status: status as StatusMulta })
      toast({
        title: 'Multa atualizada',
        description: `A multa da placa ${multa.placa} foi atualizada com sucesso.`,
      })
      onOpenChange(false)
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar',
        description: 'Ocorreu um erro ao salvar as alterações.',
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Detalhes da Multa</SheetTitle>
          <SheetDescription>Placa: {multa.placa}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Veículo</p>
              <p className="font-mono font-medium">{multa.veiculo}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data</p>
              <p className="font-medium">
                {new Date(multa.data_infracao).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Tipo de Infração</p>
              <p className="font-medium">{multa.tipo}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Condutor</p>
              <p className="font-medium">{multa.condutor}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Valor a Pagar</p>
              <p className="font-medium text-lg">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  multa.valor,
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
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Em Recurso">Em Recurso</SelectItem>
                </SelectContent>
              </Select>
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
