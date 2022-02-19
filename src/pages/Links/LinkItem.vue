<template>
  <div class="w-full rounded-xl bg-white p-4 shadow-sm">
    <div class="flex flex-col gap-y-2">
      <div class="relative flex items-center gap-x-2">
        <input
          type="text"
          class="w-full font-bold focus:outline-none"
          :class="[titleIsEditing ? 'relative z-0 opacity-100' : 'absolute -z-10 opacity-0']"
          ref="titleInputRef"
          v-model.trim="title"
          @blur="titleIsEditing = false"
          @keypress.enter="titleIsEditing = false"
        />
        <p
          class="cursor-pointer truncate font-bold"
          :class="[!title && 'text-gray-500']"
          @click="editTitle"
          v-show="!titleIsEditing"
        >
          {{ title || 'Title' }}
        </p>
        <IconPencilAlt class="flex-none cursor-pointer text-gray-300" @click="editTitle" v-show="!titleIsEditing" />
      </div>
      <div class="relative flex items-center gap-x-2">
        <input
          type="text"
          class="w-full focus:outline-none"
          :class="[urlIsEditing ? 'relative z-0 opacity-100' : 'absolute -z-10 opacity-0']"
          ref="urlInputRef"
          v-model.trim="url"
          @blur="urlIsEditing = false"
          @keypress.enter="urlIsEditing = false"
        />
        <p class="cursor-pointer truncate" :class="[!url && 'text-gray-500']" @click="editUrl" v-show="!urlIsEditing">
          {{ url || 'Url' }}
        </p>
        <IconPencilAlt class="flex-none cursor-pointer text-gray-300" @click="editUrl" v-show="!urlIsEditing" />
      </div>
    </div>
    <div>
      <!-- save / delete / more -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVModels } from '@vueuse/core'
import IconPencilAlt from '~icons/heroicons-solid/pencil-alt/'

const props = defineProps({
  title: { type: String, required: true },
  url: { type: String, required: true }
})
const emits = defineEmits(['update:title', 'update:url'])
const { title, url } = useVModels(props, emits)

const titleInputRef = ref<HTMLInputElement | null>(null)
const urlInputRef = ref<HTMLInputElement | null>(null)

const titleIsEditing = ref(false)
const urlIsEditing = ref(false)

const editTitle = () => {
  titleIsEditing.value = true
  titleInputRef.value?.focus()
}
const editUrl = () => {
  urlIsEditing.value = true
  urlInputRef.value?.focus()
}
</script>

<style></style>
