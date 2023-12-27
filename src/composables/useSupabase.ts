import { createClient } from '@supabase/supabase-js'
import { useAuthStore } from '../store/auth'
import type { Database } from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange(async (event, session) => {
  // console.group('onAuthStateChange')
  // console.log(event, session)
  // console.groupEnd()
  const authStore = useAuthStore()
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')
    authStore.user = session!.user
  else if (event === 'SIGNED_OUT')
    authStore.user = null
})

export function useSupabase() {
  return { supabase }
}
