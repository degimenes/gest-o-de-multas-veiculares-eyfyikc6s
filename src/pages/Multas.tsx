import { useEffect, useState } from 'react'
import { getMultas } from '@/services/multas'
import { useRealtime } from '@/hooks/use-realtime'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { MultaDrawer } from './Multas/MultaDrawer'
import { Multa } from '@/lib/types'

export default function Multas() {
  const [multas, setMultas] = useState<Multa[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const [selectedMulta, setSelectedMulta] = useState<Multa | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const loadData = async () => {
    try {
      const items = await getMultas()
      setMultas(items)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('multas', () => {
    loadData()
  })

  const filtered = multas.filter((m) => {
    const matchesSearch =
      m.placa.toLowerCase().includes(search.toLowerCase()) ||
      (m.condutor && m.condutor.toLowerCase().includes(search.toLowerCase())) ||
      (m.tipo && m.tipo.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openDrawer = (multa: Multa) => {
    setSelectedMulta(multa)
    setDrawerOpen(true)
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CONTROLE DE MULTAS DE TRÂNSITO</h1>
        <p className="text-muted-foreground">Listagem completa e gestão de status das infrações.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa, condutor ou tipo..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[220px] bg-background">
              <SelectValue placeholder="Filtrar por Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="Aguardando boleto">Aguardando boleto</SelectItem>
              <SelectItem value="Condutor pendente">Condutor pendente</SelectItem>
              <SelectItem value="Em Recurso">Em Recurso</SelectItem>
              <SelectItem value="Pago">Pago</SelectItem>
              <SelectItem value="Vencida / Urgente">Vencida / Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50 whitespace-nowrap">
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="max-w-[200px]">Tipo</TableHead>
                <TableHead>Condutor</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow
                  key={m.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openDrawer(m)}
                >
                  <TableCell className="font-mono font-medium">{m.placa}</TableCell>
                  <TableCell>{m.veiculo}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {new Date(m.data_infracao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={m.descricao || m.tipo}>
                    {m.descricao || m.tipo}
                  </TableCell>
                  <TableCell>{m.condutor || '-'}</TableCell>
                  <TableCell className="text-right font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      m.valor_a_pagar ?? m.valor ?? 0,
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={m.status} />
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    Nenhuma multa encontrada com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <MultaDrawer multa={selectedMulta} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
