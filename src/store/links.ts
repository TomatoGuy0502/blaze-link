import { defineStore } from 'pinia'
import { useSupabase } from '../composables/useSupabase'
import { useAuthStore } from './auth'
import { isValidUrl } from '../utils'

const { supabase } = useSupabase()

export type RootState = {
  links: any[]
  isFirstTimeLoading: boolean
}

export const useLinksStore = defineStore('links', {
  state: () =>
    ({
      links: [],
      isFirstTimeLoading: true
    } as RootState),
  actions: {
    async addLink() {
      const authStore = useAuthStore()
      const { data, error } = await supabase.from('links').insert([{ user_id: authStore.user?.id, title: '', url: '' }])
      if (error) throw error
      this.links.unshift({
        id: data[0].id,
        title: data[0].title,
        url: data[0].url
      })
    },
    async deleteLink(linkId: number) {
      const { error } = await supabase.from('links').delete().match({ id: linkId })
      if (error) throw error
      const deleteIndex = this.links.findIndex((link) => link.id === linkId)
      this.links.splice(deleteIndex, 1)
    },
    async getLinks() {
      if (!this.isFirstTimeLoading) return
      const authStore = useAuthStore()
      let { data: links, error } = await supabase
        .from('links')
        .select('id, title, url')
        .eq('user_id', authStore.user?.id)
        .order('created_at', { ascending: false })
      this.links = links!
      this.isFirstTimeLoading = false
    },
    async getLinksByName(userName: string) {
      type Profile = {
        user_name: string,
        links: {
          id: number,
          title: string,
          url: string
        }[]
      }

      // 解構比較麻煩一點
      let { data } = await supabase
        .from<Profile>('profiles')
        .select('links( id, title, url )')
        .eq('user_name', userName)
      // 從links篩選name看起來直觀，但是資料就會多一個profile
      // const { data, error } = await supabase
      //   .from('links')
      //   .select('id, url, title, profile:profiles!inner(user_name)')
      //   .eq('profiles.user_name', userName)
      return data?.[0].links || []
    },
    async updateLink({ id, title, url }: { id: number; title: string; url: string }) {
      const { data, error } = await supabase.from('links').update({ title, url }).match({ id })
      if (error) throw error
    }
  },
  getters: {
    validLinks: (state) => state.links.filter((link) => isValidUrl(link.url) && !!link.title.length)
  }
})
