import { Multa } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, DollarSign, PiggyBank, AlertTriangle } from 'lucide-react'

export function KPICards({ multas }: { multas: Multa[] }) {
  const totalMultas = multas.length
  const valorOriginalTotal = multas.reduce(
    (acc, curr) => acc + (curr.valor_original ?? curr.valor ?? 0),
    0,
  )
  const valorAPagarTotal = multas.reduce(
    (acc, curr) => acc + (curr.valor_a_pagar ?? curr.valor ?? 0),
    0,
  )
  const economia = valorOriginalTotal - valorAPagarTotal

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const cards = [
    { title: 'Total de Multas', value: totalMultas, icon: FileText, desc: 'Infrações registradas' },
    {
      title: 'Valor Original Total',
      value: formatCurrency(valorOriginalTotal),
      icon: DollarSign,
      desc: 'Sem descontos aplicados',
    },
    {
      title: 'Valor a Pagar Total',
      value: formatCurrency(valorAPagarTotal),
      icon: AlertTriangle,
      desc: 'Com descontos (pendente ou pago)',
      highlight: valorAPagarTotal > 0,
    },
    {
      title: 'Economia c/ Descontos',
      value: formatCurrency(economia > 0 ? economia : 0),
      icon: PiggyBank,
      desc: 'Redução real no custo',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <Card key={i} className={`animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon
              className={`h-4 w-4 ${card.highlight ? 'text-destructive' : 'text-muted-foreground'}`}
            />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.highlight ? 'text-destructive' : ''}`}>
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
