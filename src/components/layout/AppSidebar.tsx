import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, AlertTriangle, Car, Users, FileText, ShieldAlert } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'

const items = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Multas', url: '/multas', icon: AlertTriangle },
  { title: 'Veículos', url: '/veiculos', icon: Car },
  { title: 'Condutores', url: '/condutores', icon: Users },
  { title: 'Relatórios', url: '/relatorios', icon: FileText },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold tracking-tight text-sidebar-foreground">Gestão EPA</span>
            <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Controle de Multas
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-center text-sidebar-foreground/50">
          <p>Atualizado em:</p>
          <p className="font-mono mt-0.5">08/05/2026 22:15</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
