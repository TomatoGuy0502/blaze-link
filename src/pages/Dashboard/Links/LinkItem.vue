<template>
  <div class="flex w-full gap-x-4 overflow-hidden rounded-xl bg-white p-4 shadow-sm">
    <div class="flex flex-1 flex-col gap-y-2 overflow-hidden">
      <div class="relative flex items-center gap-x-2">
        <input
          type="text"
          class="w-full font-bold focus:outline-none"
          :class="[isTitleEditing ? 'relative z-0 opacity-100' : 'absolute -z-10 opacity-0']"
          ref="titleInputRef"
          v-model.trim="title"
          @blur="isTitleEditing = false"
          @keypress.enter="isTitleEditing = false"
        />
        <p
          class="cursor-pointer truncate font-bold"
          :class="[!title && 'text-gray-500']"
          @click="editTitle"
          v-show="!isTitleEditing"
        >
          {{ title || 'Title' }}
        </p>
        <IconPencilAlt
          class="h-5 w-5 flex-none cursor-pointer text-gray-300"
          @click="editTitle"
          v-show="!isTitleEditing"
        />
      </div>
      <div class="relative flex items-center gap-x-2">
        <input
          type="text"
          class="w-full focus:outline-none"
          :class="[isUrlEditing ? 'relative z-0 opacity-100' : 'absolute -z-10 opacity-0']"
          ref="urlInputRef"
          v-model.trim="url"
          @blur="isUrlEditing = false"
          @keypress.enter="isUrlEditing = false"
        />
        <p class="cursor-pointer truncate" :class="[!url && 'text-gray-500']" @click="editUrl" v-show="!isUrlEditing">
          {{ url || 'Url' }}
        </p>
        <IconPencilAlt class="h-5 w-5 flex-none cursor-pointer text-gray-300" @click="editUrl" v-show="!isUrlEditing" />
      </div>
    </div>
    <div class="flex-none">
      <IconTrash
        class="mt-[2px] h-5 w-5 cursor-pointer text-gray-300 transition hover:text-red-500"
        @click="handleDeleteLink(id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVModels } from '@vueuse/core'
import IconPencilAlt from '~icons/heroicons-solid/pencil-alt/'
import IconTrash from '~icons/heroicons-outline/trash/'
import { useLinksStore } from '../../../store/links'
import { useConfirmModal } from '../../../composables/useConfirmModal'

// store
const store = useLinksStore()
const { deleteLink } = store

// bind props to v-model
const props = defineProps({
  title: { type: String, required: true },
  url: { type: String, required: true },
  id: { type: Number, required: true }
})
const emits = defineEmits(['update:title', 'update:url'])
const { title, url } = useVModels(props, emits)

// edit title & url
const titleInputRef = ref<HTMLInputElement | null>(null)
const urlInputRef = ref<HTMLInputElement | null>(null)

const isTitleEditing = ref(false)
const isUrlEditing = ref(false)

const editTitle = () => {
  isTitleEditing.value = true
  titleInputRef.value?.focus()
}
const editUrl = () => {
  isUrlEditing.value = true
  urlInputRef.value?.focus()
}

// dialog
const { openModal } = useConfirmModal()

const handleDeleteLink = (id: number) => {
  openModal(() => {
    deleteLink(id)
  }, {
    title: '刪除連結',
    description: '此連結將會永久消失，確定要刪除嗎？',
    confirm: '刪除',
    cancel: '取消'
  })
}
</script>

<style></style>
