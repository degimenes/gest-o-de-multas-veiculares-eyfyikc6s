import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface DatabaseAlertProps {
  title?: string
  message?: string
}

export function DatabaseAlert({
  title = 'Erro no banco de dados',
  message = 'Não foi possível carregar os dados no momento.',
}: DatabaseAlertProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
