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
      // 也可以這樣寫，不過解構就比較麻煩一點
      // let { data, error } = await supabase.from('profiles').select('links( id, title, url )').eq('user_name', userName)
      const { data, error } = await supabase
        .from('links')
        .select('id, url, title, profiles!inner(user_name)')
        .eq('profiles.user_name', userName)
      return data
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
