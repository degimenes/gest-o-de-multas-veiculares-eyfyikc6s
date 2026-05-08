import { Badge } from '@/components/ui/badge'
import { StatusMulta } from '@/lib/types'

export function StatusBadge({ status }: { status: StatusMulta | string }) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default'

  switch (status) {
    case 'Pago':
      variant = 'secondary'
      break
    case 'Em Recurso':
      variant = 'outline'
      break
    case 'Pendente':
      variant = 'destructive'
      break
    default:
      variant = 'default'
  }

  return <Badge variant={variant}>{status}</Badge>
}
