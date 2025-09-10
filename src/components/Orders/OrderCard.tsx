import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, MapPin, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  weight?: string;
}

interface Order {
  id: string;
  customer: string;
  status: "new" | "confirmed" | "preparing" | "ready" | "dispatched";
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  address: string;
  time: string;
  estimatedTime?: string;
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: string) => void;
}

const statusConfig = {
  new: { label: "Novo", color: "bg-warning text-warning-foreground", action: "Confirmar" },
  confirmed: { label: "Confirmado", color: "bg-info text-info-foreground", action: "Iniciar Preparo" },
  preparing: { label: "Preparando", color: "bg-brand-accent text-foreground", action: "Pronto" },
  ready: { label: "Pronto", color: "bg-success text-success-foreground", action: "Despachar" },
  dispatched: { label: "Despachado", color: "bg-muted text-muted-foreground", action: null }
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const statusInfo = statusConfig[order.status];
  
  const handleNextStatus = () => {
    const statusFlow = {
      new: "confirmed",
      confirmed: "preparing", 
      preparing: "ready",
      ready: "dispatched"
    };
    
    const nextStatus = statusFlow[order.status as keyof typeof statusFlow];
    if (nextStatus) {
      onStatusChange(order.id, nextStatus);
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">Pedido #{order.id}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <User size={16} />
              <span>{order.customer}</span>
            </div>
          </div>
          <Badge className={cn("text-xs font-medium", statusInfo.color)}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-foreground">
                {item.quantity}x {item.name}
                {item.weight && <span className="text-muted-foreground"> ({item.weight})</span>}
              </span>
              <span className="font-medium">R$ {item.price.toFixed(2)}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-xs text-muted-foreground">
              +{order.items.length - 3} itens adicionais
            </p>
          )}
        </div>
        
        <div className="pt-2 border-t border-border/50">
          <div className="flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span className="text-lg">R$ {order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock size={12} />
            <span>{order.time}</span>
            {order.estimatedTime && (
              <span className="text-warning">• Estimativa: {order.estimatedTime}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={12} />
            <span>{order.paymentMethod}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span className="truncate">{order.address}</span>
          </div>
        </div>
        
        {statusInfo.action && (
          <Button 
            onClick={handleNextStatus}
            className="w-full"
            variant={order.status === "new" ? "default" : "secondary"}
          >
            {statusInfo.action}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}