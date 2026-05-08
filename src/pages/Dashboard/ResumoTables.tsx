import { Multa } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function ResumoTables({ multas }: { multas: Multa[] }) {
  const multasPorVeiculo = Object.values(
    multas.reduce(
      (acc, m) => {
        if (!acc[m.placa]) acc[m.placa] = { placa: m.placa, veiculo: m.veiculo, qtd: 0, valor: 0 }
        acc[m.placa].qtd++
        acc[m.placa].valor += m.valor_a_pagar ?? m.valor ?? 0
        return acc
      },
      {} as Record<string, { placa: string; veiculo: string; qtd: number; valor: number }>,
    ),
  ).sort((a, b) => b.valor - a.valor)

  const multasPorCondutor = Object.values(
    multas.reduce(
      (acc, m) => {
        const condutor = m.condutor || 'Não identificado'
        if (!acc[condutor]) acc[condutor] = { condutor, qtd: 0, valor: 0 }
        acc[condutor].qtd++
        acc[condutor].valor += m.valor_a_pagar ?? m.valor ?? 0
        return acc
      },
      {} as Record<string, { condutor: string; qtd: number; valor: number }>,
    ),
  ).sort((a, b) => b.valor - a.valor)

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up"
      style={{ animationDelay: '400ms' }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo por Veículo</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead className="text-center">Qtd</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {multasPorVeiculo.map((v) => (
                <TableRow key={v.placa}>
                  <TableCell className="font-mono font-medium">{v.placa}</TableCell>
                  <TableCell className="max-w-[150px] truncate" title={v.veiculo}>
                    {v.veiculo}
                  </TableCell>
                  <TableCell className="text-center">{v.qtd}</TableCell>
                  <TableCell className="text-right">{formatCurrency(v.valor)}</TableCell>
                </TableRow>
              ))}
              {multasPorVeiculo.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    Sem dados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo por Condutor</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condutor</TableHead>
                <TableHead className="text-center">Qtd</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {multasPorCondutor.map((c) => (
                <TableRow key={c.condutor}>
                  <TableCell className="font-medium">{c.condutor}</TableCell>
                  <TableCell className="text-center">{c.qtd}</TableCell>
                  <TableCell className="text-right">{formatCurrency(c.valor)}</TableCell>
                </TableRow>
              ))}
              {multasPorCondutor.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                    Sem dados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
