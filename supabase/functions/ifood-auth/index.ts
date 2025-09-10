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

    const { action } = await req.json()
    const clientId = Deno.env.get('IFOOD_CLIENT_ID')
    const clientSecret = Deno.env.get('IFOOD_CLIENT_SECRET')
    
    if (!clientId || !clientSecret) {
      throw new Error('iFood credentials not configured')
    }

    if (action === 'generateUserCode') {
      // Generate user code for device flow
      const response = await fetch('https://merchant-api.ifood.com.br/authentication/v1.0/oauth/userCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          clientId: clientId
        })
      })

      const data = await response.json()
      console.log('Generated user code:', data)

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'exchangeCode') {
      const { authorizationCode, authorizationCodeVerifier } = await req.json()

      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grantType: 'authorization_code',
          clientId: clientId,
          clientSecret: clientSecret,
          authorizationCode: authorizationCode,
          authorizationCodeVerifier: authorizationCodeVerifier
        })
      })

      const tokenData = await tokenResponse.json()
      console.log('Token exchange result:', { success: tokenResponse.ok, status: tokenResponse.status })

      if (!tokenResponse.ok) {
        throw new Error(`Token exchange failed: ${JSON.stringify(tokenData)}`)
      }

      // Store tokens in database
      const { error } = await supabase
        .from('ifood_config')
        .upsert({
          id: 1,
          access_token: tokenData.accessToken,
          refresh_token: tokenData.refreshToken,
          expires_at: new Date(Date.now() + (tokenData.expiresIn * 1000)),
          integration_status: 'connected',
          active: true,
          updated_at: new Date()
        })

      if (error) {
        console.error('Database error:', error)
        throw new Error('Failed to store tokens')
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