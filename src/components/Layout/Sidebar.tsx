import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Users, 
  Settings,
  BarChart3,
  Truck,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Pedidos", icon: ShoppingCart },
  { id: "catalog", label: "Catálogo", icon: Package },
  { id: "stock", label: "Estoque", icon: BarChart3 },
  { id: "pricing", label: "Preços", icon: DollarSign },
  { id: "ifood", label: "iFood", icon: Smartphone },
  { id: "delivery", label: "Entrega", icon: Truck },
  { id: "customers", label: "Clientes", icon: Users },
  { id: "settings", label: "Configurações", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-card border-r border-border flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          PB SUPERMERCADO
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Sistema de Gestão</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                activeTab === item.id && "shadow-glow"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon size={20} />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-success mb-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium">Online</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Conectado ao iFood
          </p>
        </div>
      </div>
    </div>
  );
}