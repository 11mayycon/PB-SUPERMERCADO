import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get access token from database
    const { data: config } = await supabase
      .from('ifood_config')
      .select('access_token, expires_at, refresh_token')
      .eq('active', true)
      .single()

    if (!config?.access_token) {
      throw new Error('No valid iFood token found. Please reconnect.')
    }

    // Check if token is expired
    if (new Date(config.expires_at) <= new Date()) {
      throw new Error('Token expired. Please reconnect.')
    }

    const { action, orderId, newStatus } = await req.json()

    if (action === 'fetchOrders') {
      // First get merchant info to get merchantId
      const merchantResponse = await fetch('https://merchant-api.ifood.com.br/merchant/v1.0/merchants', {
        headers: {
          'Authorization': `Bearer ${config.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!merchantResponse.ok) {
        throw new Error(`Failed to fetch merchant info: ${merchantResponse.status}`)
      }

      const merchants = await merchantResponse.json()
      console.log('Merchants:', merchants)

      if (!merchants || merchants.length === 0) {
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const merchantId = merchants[0].id

      // Fetch orders for the merchant
      const ordersResponse = await fetch(`https://merchant-api.ifood.com.br/order/v1.0/events:polling?types=PLACED,CONFIRMED,INTEGRATED,CANCELLED,DISPATCHED,READY_TO_PICKUP`, {
        headers: {
          'Authorization': `Bearer ${config.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!ordersResponse.ok) {
        console.error('Orders response not ok:', ordersResponse.status)
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const ordersData = await ordersResponse.json()
      console.log('Orders data:', ordersData)

      // Transform iFood orders to our format
      const transformedOrders = ordersData.map((event: any) => ({
        id: event.orderId,
        customer: event.order?.customer?.name || 'Cliente não identificado',
        status: mapIFoodStatus(event.eventType),
        items: event.order?.items?.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.totalPrice / 100, // iFood sends in cents
          weight: item.weight ? `${item.weight}g` : undefined
        })) || [],
        total: event.order?.total?.orderAmount ? event.order.total.orderAmount / 100 : 0,
        paymentMethod: event.order?.payments?.[0]?.method || 'Não informado',
        address: event.order?.delivery?.deliveryAddress?.formattedAddress || 'Retirada no local',
        time: new Date(event.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: event.order?.preparationStartDateTime ? calculateEstimatedTime(event.order.preparationStartDateTime) : undefined
      }))

      return new Response(JSON.stringify(transformedOrders), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'updateOrderStatus') {
      // Update order status in iFood
      const statusResponse = await fetch(`https://merchant-api.ifood.com.br/order/v1.0/orders/${orderId}/${newStatus}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!statusResponse.ok) {
        throw new Error(`Failed to update order status: ${statusResponse.status}`)
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    throw new Error('Invalid action')

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function mapIFoodStatus(eventType: string): string {
  const statusMap: { [key: string]: string } = {
    'PLACED': 'new',
    'CONFIRMED': 'confirmed',
    'INTEGRATED': 'preparing',
    'READY_TO_PICKUP': 'ready',
    'DISPATCHED': 'dispatched',
    'CANCELLED': 'cancelled'
  }
  return statusMap[eventType] || 'new'
}

function calculateEstimatedTime(preparationStart: string): string {
  const start = new Date(preparationStart)
  const now = new Date()
  const diffMinutes = Math.max(0, Math.ceil((start.getTime() - now.getTime()) / (1000 * 60)))
  return `${diffMinutes}min`
}