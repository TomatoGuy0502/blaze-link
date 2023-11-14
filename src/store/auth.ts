import { defineStore } from 'pinia'
import { useSupabase } from '../composables/useSupabase'
import { Profile } from '../types'
import { useLinksStore } from './links'

const { supabase } = useSupabase()

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: supabase.auth.user(),
      profile: {} as Profile | null
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
    async updateUsername(username: string) {
      const { error } = await supabase.from('profiles').update({ user_name: username }).match({ id: this.user?.id })
      if (!error) {
        this.profile!.user_name = username
      }
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
    async isUserExists(userName: string) {
      let { data } = await supabase.from('profiles').select('user_name').match({ user_name: userName })
      return data!.length > 0
    },
    async isUserHasUserName() {
      let { data } = await supabase.from('profiles').select('user_name').match({ id: this.user?.id })
      return data?.[0].user_name !== null
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user
    },
    userName(state) {
      return state.profile?.user_name === undefined ? '' : state.profile?.user_name
    }
  }
})
