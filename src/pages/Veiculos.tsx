import { useState } from 'react'
import useMultasStore from '@/stores/useMultasStore'
import { DatabaseAlert } from '@/components/DatabaseAlert'
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
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

export default function Veiculos() {
  const { veiculos } = useMultasStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')

  const filtered = veiculos.filter((v) => {
    const matchesSearch =
      v.placa.toLowerCase().includes(search.toLowerCase()) ||
      v.modelo.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || v.categoria === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <DatabaseAlert />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">CADASTRO DE VEÍCULOS</h1>
        <p className="text-muted-foreground">
          Gerencie a frota e acompanhe o histórico de infrações.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar placa ou modelo..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            <SelectItem value="Campo Móvel">Campo Móvel</SelectItem>
            <SelectItem value="Campo Fixo">Campo Fixo</SelectItem>
            <SelectItem value="Diretoria">Diretoria</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Placa</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Condutor Resp.</TableHead>
              <TableHead>Status Multas</TableHead>
              <TableHead className="text-right">Total Multas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => (
              <TableRow
                key={v.placa}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-mono font-medium">{v.placa}</TableCell>
                <TableCell className="text-muted-foreground">{v.modelo}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-background">
                    {v.categoria}
                  </Badge>
                </TableCell>
                <TableCell>{v.condutorResp || '-'}</TableCell>
                <TableCell>
                  <span
                    className={
                      v.statusMultas.includes('Sem')
                        ? 'text-success font-medium'
                        : 'text-destructive font-medium'
                    }
                  >
                    {v.statusMultas}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    v.totalMultas,
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum veículo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
