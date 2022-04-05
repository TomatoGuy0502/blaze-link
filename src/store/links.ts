import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useAuthStore } from './auth'

const { supabase } = useSupabase()

export type RootState = {
  links: any[]
}

export const useLinksStore = defineStore('links', {
  state: () =>
    ({
      links: []
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
    async getLinks(isLoading: Ref<boolean>) {
      if (this.links.length) return
      isLoading.value = true
      const authStore = useAuthStore()
      let { data: links, error } = await supabase
        .from('links')
        .select('id, title, url')
        .eq('user_id', authStore.user?.id)
        .order('created_at', { ascending: false })
      this.links = links!
      isLoading.value = false
    },
    async updateLink({id, title, url}: { id: number, title: string, url: string }) {
      const { data, error } = await supabase.from('links').update({ title, url }).match({ id })
      if (error) throw error
    }
  },
  getters: {
    validLinks: (state) => state.links.filter((link) => link.url.length && link.title.length)
  }
})
