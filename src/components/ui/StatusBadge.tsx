import { Badge } from '@/components/ui/badge'
import { StatusMulta } from '@/lib/types'
import { cn } from '@/lib/utils'

export function StatusBadge({
  status,
  className,
}: {
  status: StatusMulta | string
  className?: string
}) {
  const getVariants = () => {
    switch (status) {
      case 'PO lançada / Pago':
        return 'bg-success/10 text-success hover:bg-success/20 border-success/20'
      case 'Aguardando boleto':
      case 'Aguard. notif. penalidade':
      case 'Condutor pendente':
        return 'bg-warning/10 text-warning-foreground hover:bg-warning/20 border-warning/20 text-amber-700 dark:text-amber-400'
      case 'Recurso em andamento':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      case 'Vencida / Urgente':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20 animate-pulse-fast'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  return (
    <Badge variant="outline" className={cn('font-medium', getVariants(), className)}>
      {status}
    </Badge>
  )
}
