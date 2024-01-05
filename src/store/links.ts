import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { isValidUrl } from '../utils'
import { useAuthStore } from './auth'

const { supabase } = useSupabase()

export interface RootState {
  links: any[]
  isFirstTimeLoading: boolean
}

export const useLinksStore = defineStore('links', () => {
  const links = ref<any[]>([])
  const isFirstTimeLoading = ref<boolean>(true)

  async function addLink() {
    const authStore = useAuthStore()
    const { data, error } = await supabase.from('links').insert([
      {
        user_id: authStore.user!.id,
        title: '',
        url: '',
      },
    ]).select()
    if (error)
      throw error
    links.value.unshift({
      id: data[0].id,
      title: data![0].title,
      url: data![0].url,
    })
  }
  async function deleteLink(linkId: number) {
    const { error } = await supabase.from('links').delete().match({ id: linkId })
    if (error)
      throw error
    const deleteIndex = links.value.findIndex(link => link.id === linkId)
    links.value.splice(deleteIndex, 1)
  }
  async function getLinks() {
    if (!isFirstTimeLoading.value)
      return
    const authStore = useAuthStore()
    const { data: linksRes } = await supabase
      .from('links')
      .select('id, title, url')
      .eq('user_id', authStore.user!.id)
      .order('created_at', { ascending: false })
    links.value = linksRes!
    isFirstTimeLoading.value = false
  }
  async function getLinksAndThemeByName(userName: string) {
    const { data } = await supabase
      .from('profiles')
      .select(`
        links( id, title, url ),
        theme( * )
      `)
      .eq('user_name', userName)
      .order('created_at', { referencedTable: 'links', ascending: false })
    if (!data?.[0]?.theme)
      return null

    return {
      links: data?.[0]?.links || [],
      theme: data?.[0]?.theme,
    }
  }
  async function updateLink({ id, title, url }: { id: number, title: string, url: string }) {
    const { error } = await supabase.from('links').update({ title, url }).match({ id })
    if (error)
      throw error
  }

  const validLinks = computed(() => links.value.filter(link => isValidUrl(link.url) && !!link.title.length))

  return {
    links,
    isFirstTimeLoading,
    addLink,
    deleteLink,
    getLinks,
    getLinksAndThemeByName,
    updateLink,
    validLinks,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot))
