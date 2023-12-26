import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { computed, ref, watch } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import type { Tables } from '../../database.types'
import { getURL } from '../utils'

const { supabase } = useSupabase()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<(User | null)>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  watch(user, async (newUser) => {
    if (newUser) {
      const { data, error } = await supabase.from('profiles').select().match({ id: newUser.id })
      if (error)
        throw error
      profile.value = data![0]
    }
  })

  async function register({ email, password, name }: { email: string, password: string, name: string }) {
    const { data: { user, session }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${getURL()}dashboard`,
      },
    })
    if (error)
      throw error
    await updateUsername(name)
    await createTheme(name)

    return { user, session }
  }
  async function login({ email, password }: { email: string, password: string }) {
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword(
      { email, password },
    )
    if (error)
      throw error
    return { user, session }
  }
  async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth(
      { provider: 'google', options: { redirectTo: `${getURL()}auth/provider` } },
    )
    if (error)
      throw error
    return data
  }
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error)
      throw error
    location.reload()
  }
  async function updateUsername(username: string) {
    const { error } = await supabase.from('profiles').update({ user_name: username }).match({ id: user.value?.id })
    if (error)
      throw error
    if (profile.value)
      profile.value.user_name = username
  }
  async function createTheme(username: string) {
    const { error } = await supabase
      .from('theme')
      .insert({ user_name: username, background_color: 'White', button_color: 'Green', filled: true, radius: 'rounded-lg', shadow: 'shadow-none' })
    if (error)
      throw error
  }
  async function sendResetEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error)
      throw error
    return data
  }
  async function getUserFromToken(jwt: string) {
    const { data: { user }, error } = await supabase.auth.getUser(jwt)
    return { user, error }
  }
  async function isUserExists(userName: string) {
    const { data } = await supabase.from('profiles').select('user_name').match({ user_name: userName })
    return data!.length > 0
  }
  async function isUserHasUserName() {
    const { data } = await supabase.from('profiles').select('user_name').match({ id: user.value?.id })
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
    createTheme,
    getUserFromToken,
    isUserExists,
    isUserHasUserName,
    isLoggedIn,
    userName,
  }
})
