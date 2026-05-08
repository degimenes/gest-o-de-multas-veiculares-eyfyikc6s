import { Badge } from '@/components/ui/badge'
import { StatusMulta } from '@/lib/types'

export function StatusBadge({ status }: { status: StatusMulta | string }) {
  if (status === 'Pago') return <Badge variant="secondary">{status}</Badge>
  if (status === 'Em Recurso') return <Badge variant="outline">{status}</Badge>
  if (status === 'Vencida / Urgente' || status === 'Pendente')
    return <Badge variant="destructive">{status}</Badge>
  if (status === 'Condutor pendente')
    return (
      <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-transparent">
        {status}
      </Badge>
    )
  if (status === 'Aguardando boleto')
    return (
      <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-transparent">
        {status}
      </Badge>
    )

  return <Badge variant="default">{status}</Badge>
}
