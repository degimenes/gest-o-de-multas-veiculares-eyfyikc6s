import { Bell, Search, User, Server } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useMultasStore from '@/stores/useMultasStore'

export function AppHeader() {
  const { multas } = useMultasStore()
  const urgentCount = multas.filter((m) => m.status === 'Vencida / Urgente').length

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 shadow-sm md:px-6">
      <SidebarTrigger className="-ml-2" />
      <div className="flex flex-1 items-center justify-between gap-4 md:gap-6">
        <div className="hidden w-full max-w-sm md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por placa, AIT ou condutor..."
            className="w-full bg-muted/50 pl-9 border-none shadow-none focus-visible:bg-background focus-visible:ring-1"
          />
        </div>
        <div className="flex items-center justify-end w-full gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            title="Conectar Banco de Dados"
          >
            <Server className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="h-5 w-5" />
            {urgentCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive animate-pulse-fast" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-border/50 bg-secondary ml-2"
              >
                <User className="h-5 w-5 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
