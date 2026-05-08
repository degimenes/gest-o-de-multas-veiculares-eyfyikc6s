import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { Multa } from '@/lib/types'

export function DashboardCharts({ multas }: { multas: Multa[] }) {
  const veiculoData = useMemo(() => {
    const map = new Map<string, number>()
    multas.forEach((m) => {
      map.set(m.placa, (map.get(m.placa) || 0) + m.valorPagar)
    })
    return Array.from(map.entries())
      .map(([placa, valor]) => ({ placa, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5)
  }, [multas])

  const condutorData = useMemo(() => {
    const map = new Map<string, number>()
    multas.forEach((m) => {
      const nome = m.condutor === 'Não identificado' || !m.condutor ? 'Pendente' : m.condutor
      map.set(nome, (map.get(nome) || 0) + 1)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [multas])

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <Card className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="text-base">Resumo por Veículo (Top 5 Custos)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ valor: { label: 'Valor (R$)', color: 'hsl(var(--chart-1))' } }}
            className="h-[300px] w-full"
          >
            <BarChart
              data={veiculoData}
              layout="vertical"
              margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `R$${v}`} fontSize={12} />
              <YAxis
                dataKey="placa"
                type="category"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="valor" fill="var(--color-valor)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <CardHeader>
          <CardTitle className="text-base">Resumo por Condutor (Qtd Infrações)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <PieChart>
              <Pie
                data={condutorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {condutorData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
