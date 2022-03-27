import { defineStore } from 'pinia'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: supabase.auth.user()
    }
  },
  actions: {
    async register({ email, password, name }: { email: string; password: string; name:string }) {
      const { user, session, error } = await supabase.auth.signUp(
        { email, password },
        {
          redirectTo: `${window.location.origin}/dashboard`
        }
      )
      if (error) throw error
      
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ user_name: name })
        .eq('id', user!.id)
      console.log(data)
      if (updateError) throw updateError
  
      return { user, session }
    },
    async login({ email, password }: { email: string; password: string }) {
      const { user, session, error } = await supabase.auth.signIn(
        { email, password },
        { redirectTo: `${window.location.origin}/dashboard` }
      )
      if (error) throw error
      return { user, session }
    },
    async loginWithGoogle() {
      const { user, session, error } = await supabase.auth.signIn(
        { provider: 'google' },
        { redirectTo: `${window.location.origin}/auth/provider` }
      )
      if (error) throw error
      return { user, session }
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    async sendResetEmail(email: string) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error) throw error
      return data
    },
    async getUserFromToken(jwt: string) {
      const { user, error, data } = await supabase.auth.api.getUser(jwt)
      return { user, error, data }
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user
    }
  }
})
