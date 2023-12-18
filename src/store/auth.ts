import { defineStore } from 'pinia'
import { useSupabase } from '../composables/useSupabase'
import { Tables } from '../../database.types'
import { useLinksStore } from './links'
import type { User } from '@supabase/supabase-js'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const { supabase } = useSupabase()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<(User | null)>(null) 
  const profile = ref<Tables<'profiles'> | null>(null)

  watch(user, async (newUser) => {
    if (newUser) {
      console.log(newUser)
      const { data, error } = await supabase.from('profiles').select().match({ id: newUser.id })
      console.log(data)
      if (error) throw error
      profile.value = data![0]
    }
  })

  async function register({ email, password, name }: { email: string; password: string; name: string }) {
    const { data: { user, session }, error } = await supabase.auth.signUp({ 
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) throw error
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ user_name: name })
      .match({ id: user?.id })

    const { error: createThemeError } = await supabase
      .from('theme')
      .insert({ user_name: name, background_color: 'White', button_color: 'Gray', filled: false, radius: 'rounded-none', shadow: 'shadow-none'})
    if (updateError) throw updateError
    if (createThemeError) throw createThemeError
    return { user, session }
  }
  async function login({ email, password }: { email: string; password: string }) {
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword(
      { email, password }
    )
    if (error) throw error
    return { user, session }
  }
  async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth(
      { provider: 'google', options: { redirectTo: `${window.location.origin}/auth/provider` } }
    )
    if (error) throw error
    return data
  }
  async function logout() {
    const linksStore = useLinksStore()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    location.reload()
  }
  async function updateUsername(username: string) {
    const { error } = await supabase.from('profiles').update({ user_name: username }).match({ id: user.value?.id })
    if (!error) {
      profile.value!.user_name = username
    }
  }
  async function sendResetEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  }
  async function getUserFromToken(jwt: string) {
    const { data: { user }, error } = await supabase.auth.getUser(jwt)
    return { user, error }
  }
  async function isUserExists(userName: string) {
    let { data } = await supabase.from('profiles').select('user_name').match({ user_name: userName })
    return data!.length > 0
  }
  async function isUserHasUserName() {
    let { data } = await supabase.from('profiles').select('user_name').match({ id: user.value?.id })
    return data?.[0].user_name !== null
  }
  
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => profile.value?.user_name === undefined ? '' : profile.value?.user_name)

  return {
    user,
    profile,
    register,
    login,
    loginWithGoogle,
    logout,
    updateUsername,
    sendResetEmail,
    getUserFromToken,
    isUserExists,
    isUserHasUserName,
    isLoggedIn,
    userName
  }
})
