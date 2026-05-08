import { useState } from 'react'
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
import { Plus } from 'lucide-react'

const multaSchema = z.object({
  placa: z.string().min(1, 'Placa é obrigatória'),
  veiculo: z.string().min(1, 'Veículo é obrigatório'),
  condutor: z.string().min(1, 'Condutor é obrigatório'),
  valor: z.coerce.number().min(0.01, 'Valor deve ser maior que 0'),
  data_infracao: z.string().min(1, 'Data da infração é obrigatória'),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  status: z.enum(['Pendente', 'Pago', 'Em Recurso'], { required_error: 'Status é obrigatório' }),
})

export function CadastrarMultaDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof multaSchema>>({
    resolver: zodResolver(multaSchema),
    defaultValues: {
      placa: '',
      veiculo: '',
      condutor: '',
      valor: 0,
      data_infracao: '',
      tipo: '',
      status: 'Pendente',
    },
  })

  async function onSubmit(values: z.infer<typeof multaSchema>) {
    try {
      await createMulta({
        ...values,
        data_infracao: new Date(values.data_infracao).toISOString(),
      })
      toast({
        title: 'Multa cadastrada',
        description: 'A multa foi registrada com sucesso no sistema.',
      })
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar',
        description: 'Ocorreu um erro ao salvar a multa. Tente novamente.',
      })
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Multa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="placa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="veiculo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veículo</FormLabel>
                    <FormControl>
                      <Input placeholder="VW Gol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="condutor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condutor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do condutor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
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
                    <FormLabel>Data da Infração</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Infração</FormLabel>
                    <FormControl>
                      <Input placeholder="Excesso de Velocidade" {...field} />
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
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Em Recurso">Em Recurso</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">Salvar Multa</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
