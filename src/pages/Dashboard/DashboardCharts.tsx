import { Multa } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

export function DashboardCharts({ multas }: { multas: Multa[] }) {
  const data = multas
    .reduce(
      (acc, multa) => {
        const date = new Date(multa.data_infracao)
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const existing = acc.find((item) => item.month === month)
        if (existing) {
          existing.valor += multa.valor
        } else {
          acc.push({ month, valor: multa.valor })
        }
        return acc
      },
      [] as { month: string; valor: number }[],
    )
    .sort((a, b) => a.month.localeCompare(b.month))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Evolução de Multas (R$)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={{ valor: { label: 'Valor (R$)', color: 'hsl(var(--primary))' } }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="valor" fill="var(--color-valor)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
