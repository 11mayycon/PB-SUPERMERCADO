export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categorias: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      configuracoes: {
        Row: {
          chave: string
          created_at: string | null
          descricao: string | null
          id: string
          tipo: string | null
          updated_at: string | null
          valor: string | null
        }
        Insert: {
          chave: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string | null
          updated_at?: string | null
          valor?: string | null
        }
        Update: {
          chave?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string | null
          updated_at?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      estoque_logs: {
        Row: {
          created_at: string | null
          id: number
          motivo: string | null
          origem: string
          pedido_id: number | null
          produto_id: number | null
          quantidade_alterada: number
          quantidade_anterior: number
          quantidade_nova: number
          usuario_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          motivo?: string | null
          origem: string
          pedido_id?: number | null
          produto_id?: number | null
          quantidade_alterada: number
          quantidade_anterior: number
          quantidade_nova: number
          usuario_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          motivo?: string | null
          origem?: string
          pedido_id?: number | null
          produto_id?: number | null
          quantidade_alterada?: number
          quantidade_anterior?: number
          quantidade_nova?: number
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "estoque_logs_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ifood_config: {
        Row: {
          access_token: string | null
          active: boolean | null
          client_id: string | null
          client_secret: string | null
          created_at: string | null
          expires_at: string | null
          id: number
          integration_status: string | null
          last_sync: string | null
          refresh_token: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          active?: boolean | null
          client_id?: string | null
          client_secret?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          integration_status?: string | null
          last_sync?: string | null
          refresh_token?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          active?: boolean | null
          client_id?: string | null
          client_secret?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          integration_status?: string | null
          last_sync?: string | null
          refresh_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inovapro_config: {
        Row: {
          active: boolean | null
          created_at: string | null
          database_name: string | null
          id: number
          integration_status: string | null
          last_sync: string | null
          password: string | null
          server_url: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          database_name?: string | null
          id?: number
          integration_status?: string | null
          last_sync?: string | null
          password?: string | null
          server_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          database_name?: string | null
          id?: number
          integration_status?: string | null
          last_sync?: string | null
          password?: string | null
          server_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      integrations: {
        Row: {
          active: boolean | null
          config: string | null
          created_at: string | null
          id: number
          last_sync: string | null
          platform: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          config?: string | null
          created_at?: string | null
          id?: number
          last_sync?: string | null
          platform: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          config?: string | null
          created_at?: string | null
          id?: number
          last_sync?: string | null
          platform?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      oauth_tokens: {
        Row: {
          access_token: string
          created_at: string | null
          expires_at: string | null
          id: string
          provider: string
          refresh_token: string | null
          scope: string | null
          token_type: string | null
          updated_at: string | null
        }
        Insert: {
          access_token: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          provider: string
          refresh_token?: string | null
          scope?: string | null
          token_type?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          provider?: string
          refresh_token?: string | null
          scope?: string | null
          token_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          delivery_address: string | null
          external_id: string
          id: number
          items: string | null
          platform: string
          status: string
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_address?: string | null
          external_id: string
          id?: number
          items?: string | null
          platform: string
          status: string
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_address?: string | null
          external_id?: string
          id?: number
          items?: string | null
          platform?: string
          status?: string
          total?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      pedido_itens: {
        Row: {
          created_at: string | null
          id: string
          observacoes: string | null
          pedido_id: string | null
          preco_total: number
          preco_unitario: number
          produto_id: string | null
          quantidade: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          preco_total: number
          preco_unitario: number
          produto_id?: string | null
          quantidade: number
        }
        Update: {
          created_at?: string | null
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          preco_total?: number
          preco_unitario?: number
          produto_id?: string | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedido_itens_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          canal: string
          cliente_email: string | null
          cliente_nome: string | null
          cliente_telefone: string | null
          created_at: string | null
          data_entrega: string | null
          data_pedido: string | null
          endereco_entrega: string | null
          forma_pagamento: string | null
          id: string
          ifood_order_id: string | null
          inovapro_order_id: string | null
          numero_pedido: string
          observacoes: string | null
          sitemercado_order_id: string | null
          status: string | null
          updated_at: string | null
          valor_desconto: number | null
          valor_entrega: number | null
          valor_total: number
        }
        Insert: {
          canal: string
          cliente_email?: string | null
          cliente_nome?: string | null
          cliente_telefone?: string | null
          created_at?: string | null
          data_entrega?: string | null
          data_pedido?: string | null
          endereco_entrega?: string | null
          forma_pagamento?: string | null
          id?: string
          ifood_order_id?: string | null
          inovapro_order_id?: string | null
          numero_pedido: string
          observacoes?: string | null
          sitemercado_order_id?: string | null
          status?: string | null
          updated_at?: string | null
          valor_desconto?: number | null
          valor_entrega?: number | null
          valor_total: number
        }
        Update: {
          canal?: string
          cliente_email?: string | null
          cliente_nome?: string | null
          cliente_telefone?: string | null
          created_at?: string | null
          data_entrega?: string | null
          data_pedido?: string | null
          endereco_entrega?: string | null
          forma_pagamento?: string | null
          id?: string
          ifood_order_id?: string | null
          inovapro_order_id?: string | null
          numero_pedido?: string
          observacoes?: string | null
          sitemercado_order_id?: string | null
          status?: string | null
          updated_at?: string | null
          valor_desconto?: number | null
          valor_entrega?: number | null
          valor_total?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          erp_id: string | null
          id: number
          ifood_id: string | null
          name: string
          price: number
          sitemercado_id: string | null
          sku: string | null
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          erp_id?: string | null
          id?: number
          ifood_id?: string | null
          name: string
          price: number
          sitemercado_id?: string | null
          sku?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          erp_id?: string | null
          id?: number
          ifood_id?: string | null
          name?: string
          price?: number
          sitemercado_id?: string | null
          sku?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          categoria_id: string | null
          codigo_barras: string | null
          created_at: string | null
          descricao: string | null
          estoque: number | null
          estoque_minimo: number | null
          id: string
          ifood_id: string | null
          imagem_url: string | null
          inovapro_id: string | null
          nome: string
          preco: number
          sincronizado_ifood: boolean | null
          sincronizado_inovapro: boolean | null
          sincronizado_sitemercado: boolean | null
          sitemercado_id: string | null
          sku: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          categoria_id?: string | null
          codigo_barras?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque?: number | null
          estoque_minimo?: number | null
          id?: string
          ifood_id?: string | null
          imagem_url?: string | null
          inovapro_id?: string | null
          nome: string
          preco: number
          sincronizado_ifood?: boolean | null
          sincronizado_inovapro?: boolean | null
          sincronizado_sitemercado?: boolean | null
          sitemercado_id?: string | null
          sku?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          categoria_id?: string | null
          codigo_barras?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque?: number | null
          estoque_minimo?: number | null
          id?: string
          ifood_id?: string | null
          imagem_url?: string | null
          inovapro_id?: string | null
          nome?: string
          preco?: number
          sincronizado_ifood?: boolean | null
          sincronizado_inovapro?: boolean | null
          sincronizado_sitemercado?: boolean | null
          sitemercado_id?: string | null
          sku?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemercado_config: {
        Row: {
          active: boolean | null
          api_key: string | null
          created_at: string | null
          id: number
          integration_status: string | null
          last_sync: string | null
          store_id: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          api_key?: string | null
          created_at?: string | null
          id?: number
          integration_status?: string | null
          last_sync?: string | null
          store_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          api_key?: string | null
          created_at?: string | null
          id?: number
          integration_status?: string | null
          last_sync?: string | null
          store_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          password: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
          password: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          email: string
          id: number
          nome: string
          role: string | null
          senha: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          email: string
          id?: number
          nome: string
          role?: string | null
          senha: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string
          id?: number
          nome?: string
          role?: string | null
          senha?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
