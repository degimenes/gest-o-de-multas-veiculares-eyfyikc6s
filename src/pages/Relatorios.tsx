import { DatabaseAlert } from '@/components/DatabaseAlert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function Relatorios() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <DatabaseAlert />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">RELATÓRIOS</h1>
        <p className="text-muted-foreground">Geração de relatórios gerenciais e operacionais.</p>
      </div>

      <Card className="mt-8 border-dashed bg-muted/10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle>Módulo de Exportação</CardTitle>
          <CardDescription>Funcionalidade dependente de dados reais.</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            A exportação de dados (PDF, Excel) estará disponível após a conexão com o banco de dados
            principal.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
