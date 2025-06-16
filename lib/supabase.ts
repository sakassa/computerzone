import { createClient } from "@supabase/supabase-js"

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Laptop = {
  id: string
  name: string
  brand: string
  price: number
  condition: "New" | "Like New"
  stock: number
  image_url?: string
  description?: string
  created_at?: string
  specs: {
    CPU: string
    GPU: string
    RAM: string
    SSD: string
    Screen: string
    Weight: string
  }
}
