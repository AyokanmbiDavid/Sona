import { createClient } from "@supabase/supabase-js/dist/index.cjs";

const superbaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(superbaseUrl, supabaseAnonKey)