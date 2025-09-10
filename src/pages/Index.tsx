import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { OrderCard } from "@/components/Orders/OrderCard";
import { ConnectionStatus } from "@/components/iFood/ConnectionStatus";
import { useIFoodOrders } from "@/hooks/useIFoodOrders";
import { supabase } from "@/integrations/supabase/client";
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const getStatusLabel = (status: string): string => {
  const statusMap = {
    new: "Novo",
    confirmed: "Confirmado", 
    preparing: "Preparando",
    ready: "Pronto",
    dispatched: "Despachado"
  };
  return statusMap[status as keyof typeof statusMap] || status;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isConnectedToIFood, setIsConnectedToIFood] = useState(false);
  const { orders, loading: ordersLoading, error: ordersError, updateOrderStatus } = useIFoodOrders();

  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.error) {
      console.error('Failed to update order status:', result.error);
    }
  };

  const handleIFoodConnect = () => {
    setIsConnectedToIFood(true);
  };

  // Check iFood connection status on component mount
  useEffect(() => {
    const checkIFoodConnection = async () => {
      const { data } = await supabase
        .from('ifood_config')
        .select('integration_status, expires_at')
        .eq('active', true)
        .single();

      if (data?.integration_status === 'connected') {
        const expiresAt = new Date(data.expires_at);
        const now = new Date();
        setIsConnectedToIFood(expiresAt > now);
      }
    };

    checkIFoodConnection();
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das operações do supermercado</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Pedidos Hoje"
          value="24"
          change="+12% vs ontem"
          icon={ShoppingCart}
          trend="up"
        />
        <MetricCard
          title="Faturamento"
          value="R$ 2.840"
          change="+8% vs ontem"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Produtos Ativos"
          value="2.847"
          change="98% disponíveis"
          icon={Package}
          trend="neutral"
        />
        <MetricCard
          title="Ticket Médio"
          value="R$ 118"
          change="+5% vs semana"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Pedidos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ordersLoading ? (
                <p className="text-muted-foreground text-center">Carregando pedidos...</p>
              ) : ordersError ? (
                <p className="text-destructive text-center">{ordersError}</p>
              ) : orders.length === 0 ? (
                <p className="text-muted-foreground text-center">Nenhum pedido encontrado.</p>
              ) : (
                orders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="font-medium">#{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {order.total.toFixed(2)}</p>
                      <Badge variant="outline" className="text-xs">
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={20} />
              Alertas de Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div>
                <p className="font-medium">Arroz Tio João 5kg</p>
                <p className="text-sm text-muted-foreground">Estoque baixo</p>
              </div>
              <Badge variant="outline" className="text-warning border-warning/50">
                8 unidades
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div>
                <p className="font-medium">Leite Integral 1L</p>
                <p className="text-sm text-muted-foreground">Sem estoque</p>
              </div>
              <Badge variant="outline" className="text-destructive border-destructive/50">
                0 unidades
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pedidos</h1>
          <p className="text-muted-foreground">Gerencie todos os pedidos em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Buscar pedido..." className="w-64" />
          <Button variant="outline">Filtros</Button>
        </div>
      </div>

      {ordersLoading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Carregando pedidos...</p>
        </div>
      ) : ordersError ? (
        <div className="text-center py-8">
          <p className="text-destructive">{ordersError}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
          {!isConnectedToIFood && (
            <p className="text-sm text-muted-foreground mt-2">
              Conecte-se ao iFood para ver os pedidos.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onStatusChange={handleOrderStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderIFood = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Integração iFood</h1>
        <p className="text-muted-foreground">Configure e monitore sua conexão com o iFood</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConnectionStatus 
          isConnected={isConnectedToIFood}
          onConnect={handleIFoodConnect}
        />
        
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Configurações da API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Informações da Aplicação</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Client ID:</span>
                  <code className="text-primary">5db4...698</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ambiente:</span>
                  <Badge variant="outline">Produção</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle size={12} className="text-success" />
                    <span className="text-success text-xs">Configurado</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              ⚠️ As credenciais estão armazenadas de forma segura no backend
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "orders":
        return renderOrders();
      case "ifood":
        return renderIFood();
      case "catalog":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
            <p className="text-muted-foreground">Em desenvolvimento...</p>
          </div>
        );
      case "stock":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Controle de Estoque</h1>
            <p className="text-muted-foreground">Em desenvolvimento...</p>
          </div>
        );
      case "pricing":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestão de Preços</h1>
            <p className="text-muted-foreground">Em desenvolvimento...</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {!isConnectedToIFood && activeTab !== "ifood" && (
          <div className="mb-6 bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-warning" size={20} />
                <div>
                  <p className="font-medium">iFood não conectado</p>
                  <p className="text-sm text-muted-foreground">
                    Configure a integração para receber pedidos automaticamente.
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab("ifood")}
              >
                Conectar Agora
              </Button>
            </div>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;