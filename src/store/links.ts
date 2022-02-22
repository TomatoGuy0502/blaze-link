import { defineStore } from 'pinia'

export const useLinksStore = defineStore('links', {
  state: () => {
    return {
      links: [
        { title: '', url: '', id: 1 },
        { title: '', url: '', id: 2 },
        { title: '', url: '', id: 3 },
        { title: '', url: '', id: 4 },
        { title: '', url: '', id: 5 }
      ]
    }
  },
  actions: {
    addLink() {
      const newLink = { title: '', url: '', id: new Date().getTime() }
      this.links.push(newLink)
    },
    deleteLink(linkId: number) {
      const index = this.links.findIndex((link) => link.id === linkId)
      if (index > -1) {
        this.links.splice(index, 1)
      }
    }
  }
})
