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
          radius: string | null
          shadow: string | null
          shadow_color: string | null
          user_name: string
        }
        Insert: {
          background_color?: Database["public"]["Enums"]["color"] | null
          button_color?: Database["public"]["Enums"]["color"] | null
          filled?: boolean
          radius?: string | null
          shadow?: string | null
          shadow_color?: string | null
          user_name: string
        }
        Update: {
          background_color?: Database["public"]["Enums"]["color"] | null
          button_color?: Database["public"]["Enums"]["color"] | null
          filled?: boolean
          radius?: string | null
          shadow?: string | null
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
