import { useEffect, useState } from 'react'
import { Multa } from '@/lib/types'
import { getMultas } from '@/services/multas'
import { useRealtime } from '@/hooks/use-realtime'
import { KPICards } from './Dashboard/KPICards'
import { DashboardCharts } from './Dashboard/DashboardCharts'
import { ResumoTables } from './Dashboard/ResumoTables'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { CadastrarMultaDialog } from '@/components/CadastrarMultaDialog'
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
  const [multas, setMultas] = useState<Multa[]>([])

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

  const recentes = [...multas]
    .sort((a, b) => new Date(b.data_infracao).getTime() - new Date(a.data_infracao).getTime())
    .slice(0, 5)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">DASHBOARD — CONTROLE DE MULTAS</h1>
          <p className="text-muted-foreground">
            Visão geral do cenário de multas e custos associados.
          </p>
        </div>
        <CadastrarMultaDialog />
      </div>

      <KPICards multas={multas} />
      <DashboardCharts multas={multas} />

      <ResumoTables multas={multas} />

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
                <TableHead>Veículo</TableHead>
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
                  <TableCell>{multa.veiculo}</TableCell>
                  <TableCell>{new Date(multa.data_infracao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{multa.condutor || 'Não identificado'}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      multa.valor_a_pagar ?? multa.valor ?? 0,
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={multa.status} />
                  </TableCell>
                </TableRow>
              ))}
              {recentes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
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
