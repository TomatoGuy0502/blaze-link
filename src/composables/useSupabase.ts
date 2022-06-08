import { createClient } from '@supabase/supabase-js'
import { useAuthStore } from '../store/auth'
import type { Profile } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log(session)
  const authStore = useAuthStore()
  authStore.user = session?.user || null
  if (!session?.user) return

  let { data } = await supabase
    .from<Profile>('profiles')
    .select('*')
    .eq('id', session.user.id)
  authStore.profile = data![0]
})

export const useSupabase = () => {
  return { supabase }
}
