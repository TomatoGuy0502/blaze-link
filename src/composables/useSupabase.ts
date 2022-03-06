import { createClient } from '@supabase/supabase-js'
import { useAuthStore } from '../store/auth'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
  else if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
  const authStore = useAuthStore()
  authStore.user = session?.user || null
})

export const useSupabase = () => {
  return { supabase }
}
