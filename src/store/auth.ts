import { defineStore } from 'pinia'
import { useSupabase } from '../composables/useSupabase'
import { useLinksStore } from './links'

const { supabase } = useSupabase()

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: supabase.auth.user()
    }
  },
  actions: {
    async register({ email, password, name }: { email: string; password: string; name: string }) {
      const { user, session, error } = await supabase.auth.signUp(
        { email, password },
        {
          data: { name },
          redirectTo: `${window.location.origin}/dashboard`
        }
      )
      if (error) throw error
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ user_name: name, email })
        .match({ id: user?.id })
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
      const linksStore = useLinksStore()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      linksStore.links = []
    },
    async sendResetEmail(email: string) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error) throw error
      return data
    },
    async getUserFromToken(jwt: string) {
      const { user, error, data } = await supabase.auth.api.getUser(jwt)
      return { user, error, data }
    },
    async checkIfUserExists(userName: string) {
      let { data } = await supabase.from('profiles').select('user_name').match({ user_name: userName })
      return data!.length > 0
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user
    },
    userName(state) {
      return state.user?.user_metadata.name as string || 'My friend'
    }
  }
})
