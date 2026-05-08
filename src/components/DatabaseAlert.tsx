import { AlertTriangle, Database } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import useMultasStore from '@/stores/useMultasStore'

export function DatabaseAlert() {
  const { isDatabaseConnected } = useMultasStore()

  if (isDatabaseConnected) return null

  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
      <Database className="h-4 w-4 !text-amber-600 dark:!text-amber-400" />
      <AlertTitle className="font-semibold flex items-center gap-2">
        Atenção: Banco de Dados não conectado
      </AlertTitle>
      <AlertDescription className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm opacity-90 leading-relaxed">
          Para visualizar os dados reais da planilha (DASHBOARD — CONTROLE DE MULTAS), você precisa
          conectá-la a um banco de dados (Supabase ou Skip Cloud). Os dados exibidos atualmente são
          fictícios e apenas para demonstração da interface.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-amber-300 dark:border-amber-800"
        >
          <AlertTriangle className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
          Conectar Banco de Dados
        </Button>
      </AlertDescription>
    </Alert>
  )
}
