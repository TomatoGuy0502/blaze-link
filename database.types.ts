export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          created_at: string | null
          id: number
          title: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          title?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      theme: {
        Row: {
          background_color: Database["public"]["Enums"]["color"] | null
          button_color: Database["public"]["Enums"]["color"] | null
          filled: boolean
          radius: Database["public"]["Enums"]["radius"]
          shadow: Database["public"]["Enums"]["shadow"]
          shadow_color: string | null
          user_name: string
        }
        Insert: {
          background_color?: Database["public"]["Enums"]["color"] | null
          button_color?: Database["public"]["Enums"]["color"] | null
          filled?: boolean
          radius?: Database["public"]["Enums"]["radius"]
          shadow?: Database["public"]["Enums"]["shadow"]
          shadow_color?: string | null
          user_name: string
        }
        Update: {
          background_color?: Database["public"]["Enums"]["color"] | null
          button_color?: Database["public"]["Enums"]["color"] | null
          filled?: boolean
          radius?: Database["public"]["Enums"]["radius"]
          shadow?: Database["public"]["Enums"]["shadow"]
          shadow_color?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_user_name_fkey"
            columns: ["user_name"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_name"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      color:
        | "White"
        | "Gray"
        | "Black"
        | "Pink"
        | "Fuchsia"
        | "Blue"
        | "Cyan"
        | "Teal"
        | "Green"
        | "Lime"
        | "Amber"
        | "Orange"
        | "Red"
      radius:
        | "rounded-none"
        | "rounded"
        | "rounded-lg"
        | "rounded-xl"
        | "rounded-2xl"
        | "rounded-[30px]"
      shadow:
        | "shadow-none"
        | "shadow shadow-gray-600/30"
        | "shadow-md shadow-gray-600/30"
        | "shadow-lg shadow-gray-600/30"
        | "shadow-[4px_4px] shadow-gray-800"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
