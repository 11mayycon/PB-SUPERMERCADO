import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  weight?: string;
}

export interface Order {
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

export function useIFoodOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('ifood-orders', {
        body: { action: 'fetchOrders' }
      });

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Erro ao carregar pedidos');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase.functions.invoke('ifood-orders', {
        body: { 
          action: 'updateOrderStatus', 
          orderId, 
          newStatus 
        }
      });

      if (error) {
        throw error;
      }

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as any }
          : order
      ));

      return { success: true };
    } catch (err: any) {
      console.error('Error updating order status:', err);
      return { error: err.message || 'Erro ao atualizar status do pedido' };
    }
  };

  useEffect(() => {
    // Fetch orders initially
    fetchOrders();
    
    // Set up polling every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus
  };
}