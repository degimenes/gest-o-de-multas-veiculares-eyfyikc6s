import { Multa } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, DollarSign, Wallet, PiggyBank } from 'lucide-react'

export function KPICards({ multas }: { multas: Multa[] }) {
  const totalMultas = multas.length
  const valorOriginal = multas.reduce((acc, curr) => acc + curr.valorOriginal, 0)
  const valorPagar = multas.reduce((acc, curr) => acc + curr.valorPagar, 0)
  const economia = valorOriginal - valorPagar

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const cards = [
    { title: 'Total de Multas', value: totalMultas, icon: FileText, desc: 'Infrações registradas' },
    {
      title: 'Valor Original Total',
      value: formatCurrency(valorOriginal),
      icon: DollarSign,
      desc: 'Sem descontos',
    },
    {
      title: 'Valor a Pagar Total',
      value: formatCurrency(valorPagar),
      icon: Wallet,
      desc: 'Previsão de custo',
    },
    {
      title: 'Economia c/ Descontos',
      value: formatCurrency(economia),
      icon: PiggyBank,
      desc: 'Redução atingida',
      highlight: true,
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
              className={`h-4 w-4 ${card.highlight ? 'text-success' : 'text-muted-foreground'}`}
            />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.highlight ? 'text-success' : ''}`}>
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
