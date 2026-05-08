import useMultasStore from '@/stores/useMultasStore'
import { DatabaseAlert } from '@/components/DatabaseAlert'
import { KPICards } from './Dashboard/KPICards'
import { DashboardCharts } from './Dashboard/DashboardCharts'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Dashboard() {
  const { multas } = useMultasStore()

  const recentes = [...multas]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <DatabaseAlert />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">DASHBOARD — CONTROLE DE MULTAS</h1>
        <p className="text-muted-foreground">
          Visão geral do cenário de multas e custos associados.
        </p>
      </div>

      <KPICards multas={multas} />
      <DashboardCharts multas={multas} />

      <Card className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <CardHeader>
          <CardTitle className="text-base">Infrações Recentes</CardTitle>
          <CardDescription>Últimas 5 multas adicionadas ao sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Condutor</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentes.map((multa) => (
                <TableRow key={multa.id}>
                  <TableCell className="font-mono font-medium">{multa.placa}</TableCell>
                  <TableCell>{new Date(multa.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{multa.condutor || 'Não identificado'}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      multa.valorPagar,
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={multa.status} />
                  </TableCell>
                </TableRow>
              ))}
              {recentes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    Nenhuma multa recente
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
