import { DatabaseAlert } from '@/components/DatabaseAlert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

export default function Condutores() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <DatabaseAlert />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">CONDUTORES</h1>
        <p className="text-muted-foreground">Gestão de motoristas e vinculação de pontuação.</p>
      </div>

      <Card className="mt-8 border-dashed bg-muted/10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
          <CardDescription>
            Conecte seu banco de dados para habilitar a visualização e gestão detalhada de
            condutores.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            O detalhamento de condutores, controle de CNH e pontuações serão ativados assim que o
            backend estiver provisionado e os dados reais sincronizados.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
