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
          <SheetDescription>
            Placa: <span className="font-mono text-foreground">{multa.placa}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
            <div className="col-span-2">
              <p className="text-muted-foreground">Infração</p>
              <p className="font-medium">{multa.descricao || multa.tipo}</p>
            </div>

            <div>
              <p className="text-muted-foreground">AIT</p>
              <p className="font-mono font-medium">{multa.ait || '-'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fornecedor</p>
              <p className="font-medium">{multa.fornecedor || '-'}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Veículo</p>
              <p className="font-medium">{multa.veiculo}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data</p>
              <p className="font-medium">
                {new Date(multa.data_infracao).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Condutor</p>
              <p className="font-medium">{multa.condutor || '-'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Projeto</p>
              <p className="font-medium">{multa.projeto || '-'}</p>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-2 bg-muted/30 p-3 rounded-lg border">
              <div>
                <p className="text-muted-foreground text-xs">Valor Orig.</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    multa.valor_original ?? multa.valor ?? 0,
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Desconto</p>
                <p className="font-medium">{multa.desconto || '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">A Pagar</p>
                <p className="font-medium text-destructive">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    multa.valor_a_pagar ?? multa.valor ?? 0,
                  )}
                </p>
              </div>
            </div>

            {multa.observacoes && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Observações</p>
                <p className="font-medium">{multa.observacoes}</p>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Alterar Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aguardando boleto">Aguardando boleto</SelectItem>
                  <SelectItem value="Condutor pendente">Condutor pendente</SelectItem>
                  <SelectItem value="Em Recurso">Em Recurso</SelectItem>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Vencida / Urgente">Vencida / Urgente</SelectItem>
                  {status === 'Pendente' && (
                    <SelectItem value="Pendente">Pendente (Legado)</SelectItem>
                  )}
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
