import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { computed, ref, watch } from 'vue'
import type { Tables } from '../../database.types'
import { useSupabase } from '@/composables/useSupabase'
import { getURL } from '@/utils'
import { preservedIds } from '@/router'

const { supabase } = useSupabase()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<(User | null)>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => profile.value?.user_name === undefined ? '' : profile.value?.user_name)

  watch(user, async (newUser) => {
    if (newUser) {
      const { data, error } = await supabase.from('profiles').select().match({ id: newUser.id })
      if (error)
        throw error
      profile.value = data![0]
    }
  })

  async function register({ email, password, name }: { email: string, password: string, name: string }) {
    if (await isEmailExists(email))
      throw new Error('This email is already registered.')
    if (await isUserExists(name))
      throw new Error('This username is already registered.')
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
  async function updateUsername(newUserName: string) {
    if (userName.value === newUserName)
      return
    if (preservedIds.includes(newUserName.toLowerCase()))
      throw new Error('This name is not available.')
    if (await isUserExists(newUserName))
      throw new Error('This name is not available.')
    if (newUserName.length < 3 || newUserName.length > 20)
      throw new Error('Username must be 3 ~ 20 characters long.')
    if (newUserName.match(/[^a-zA-Z0-9_.-]/g))
      throw new Error('User name can only contain letters, numbers, dot(.), dash(-) and underscore(_)')
    if (!/^[a-zA-Z0-9_].*[a-zA-Z0-9_]$/.test(newUserName))
      throw new Error('User name must start and end with a letter, number or underscore(_)')
    const { error } = await supabase.from('profiles').update({ user_name: newUserName, updated_at: new Date() }).match({ id: user.value?.id })
    if (error)
      throw error
    if (profile.value)
      profile.value.user_name = newUserName
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
  async function isEmailExists(email: string) {
    const { data } = await supabase.from('profiles').select('email').match({ email })
    return data!.length > 0
  }
  async function isUserHasUserName() {
    const { data } = await supabase.from('profiles').select('user_name').match({ id: user.value?.id })
    return data?.[0].user_name !== null
  }

  const avatarSrc = ref('')
  watch(() => profile.value?.avatar_url, async (url) => {
    if (url)
      avatarSrc.value = await downloadAvatar(url)
  }, { immediate: true })
  async function updateAvatar(avatarUrl: string) {
    try {
      const updates = {
        id: user.value!.id,
        avatar_url: avatarUrl,
      }
      const { error } = await supabase.from('profiles').upsert(updates)
      if (error)
        throw error
    }
    catch (error) {
      if (error instanceof Error)
        console.error(error.message)
    }
  }
  async function downloadAvatar(avatarUrl: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(avatarUrl)
      if (error)
        throw error
      return URL.createObjectURL(data)
    }
    catch (error) {
      if (error instanceof Error)
        console.error('Error downloading image: ', error.message)
      return ''
    }
  }

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
    isEmailExists,
    isUserHasUserName,
    isLoggedIn,
    userName,
    avatarSrc,
    updateAvatar,
    downloadAvatar,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
