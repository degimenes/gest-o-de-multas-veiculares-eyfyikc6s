import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { createMulta } from '@/services/multas'
import useVeiculosStore from '@/stores/useVeiculosStore'
import { Plus } from 'lucide-react'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { ScrollArea } from '@/components/ui/scroll-area'

const multaSchema = z.object({
  placa: z.string().min(1, 'Placa é obrigatória'),
  veiculo: z.string().min(1, 'Veículo é obrigatório'),
  condutor: z.string().min(1, 'Condutor é obrigatório'),
  ait: z.string().min(1, 'AIT obrigatório'),
  fornecedor: z.string().optional(),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  tipo: z.string().optional(),
  valor_original: z.coerce.number().min(0.01, 'Valor inválido'),
  desconto: z.string().optional(),
  valor_a_pagar: z.coerce.number().min(0, 'Valor inválido'),
  data_infracao: z.string().min(1, 'Data da infração é obrigatória'),
  projeto: z.string().optional(),
  observacoes: z.string().optional(),
  status: z.enum(
    [
      'Pago',
      'Aguardando boleto',
      'Condutor pendente',
      'Em Recurso',
      'Vencida / Urgente',
      'Pendente',
    ],
    { required_error: 'Status é obrigatório' },
  ),
})

export function CadastrarMultaDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { veiculos } = useVeiculosStore()

  const form = useForm<z.infer<typeof multaSchema>>({
    resolver: zodResolver(multaSchema),
    defaultValues: {
      placa: '',
      veiculo: '',
      condutor: '',
      ait: '',
      fornecedor: '',
      descricao: '',
      tipo: 'Infração',
      valor_original: 0,
      desconto: '',
      valor_a_pagar: 0,
      data_infracao: '',
      projeto: '',
      observacoes: '',
      status: 'Aguardando boleto',
    },
  })

  // Auto fill veiculo and condutor when placa changes
  const selectedPlaca = form.watch('placa')
  useEffect(() => {
    if (selectedPlaca) {
      const v = veiculos.find((x) => x.placa === selectedPlaca)
      if (v) {
        form.setValue('veiculo', v.modelo)
        if (v.condutor_responsavel) {
          form.setValue('condutor', v.condutor_responsavel)
        }
      }
    }
  }, [selectedPlaca, veiculos, form])

  async function onSubmit(values: z.infer<typeof multaSchema>) {
    try {
      await createMulta({
        ...values,
        tipo: values.descricao, // save descricao into tipo as well for compatibility
        valor: values.valor_original, // backwards compatibility
        data_infracao: new Date(values.data_infracao).toISOString(),
      })
      toast({
        title: 'Multa cadastrada',
        description: 'A multa foi registrada com sucesso no sistema.',
      })
      setOpen(false)
      form.reset()
    } catch (error) {
      const fieldErrors = extractFieldErrors(error)
      if (Object.keys(fieldErrors).length > 0) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          form.setError(field as any, { message })
        })
        toast({
          variant: 'destructive',
          title: 'Erro de validação',
          description: 'Verifique os campos em vermelho.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro ao salvar a multa. Tente novamente.',
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar Nova Multa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Cadastrar Nova Multa</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="placa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o veículo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {veiculos.map((v) => (
                            <SelectItem key={v.id} value={v.placa}>
                              {v.placa}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="veiculo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veículo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Preenchimento automático" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="condutor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condutor *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do condutor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ait"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AIT *</FormLabel>
                      <FormControl>
                        <Input placeholder="Número do AIT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fornecedor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fornecedor</FormLabel>
                      <FormControl>
                        <Input placeholder="Órgão autuador (Ex: CET-SP)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data_infracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Infração *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da Infração *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Transitar em local/horário não permitido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="valor_original"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Original (R$) *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desconto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desconto (%)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 40%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valor_a_pagar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor a Pagar (R$) *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projeto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projeto (Centro de Custo)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 25-1047" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Aguardando boleto">Aguardando boleto</SelectItem>
                          <SelectItem value="Condutor pendente">Condutor pendente</SelectItem>
                          <SelectItem value="Em Recurso">Em Recurso</SelectItem>
                          <SelectItem value="Pago">Pago</SelectItem>
                          <SelectItem value="Vencida / Urgente">Vencida / Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Input placeholder="Anotações adicionais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4 pb-2">
                <Button type="submit">Salvar Multa</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
