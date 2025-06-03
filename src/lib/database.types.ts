export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bugs: {
        Row: {
          created_at: string
          description: string | null
          id: number
          priority: Database["public"]["Enums"]["bug_priority"]
          status: Database["public"]["Enums"]["bug_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["bug_priority"]
          status?: Database["public"]["Enums"]["bug_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["bug_priority"]
          status?: Database["public"]["Enums"]["bug_status"]
          title?: string
          updated_at?: string
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
      bug_priority: "Critical" | "High" | "Medium" | "Low"
      bug_status: "Open" | "In Progress" | "Closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 