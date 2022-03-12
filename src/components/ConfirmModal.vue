<template>
  <TransitionRoot appear as="template" :show="isShow">
    <Dialog @close="cancel" class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      </TransitionChild>

      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div class="min-w-[300px] max-w-sm transform rounded-xl bg-white p-4 shadow transition-all">
          <DialogTitle class="mb-2 text-lg font-medium leading-6 text-gray-900">{{ templateText.title }} </DialogTitle>
          <DialogDescription class="mb-4 text-sm text-gray-500">
            {{ templateText.description }}
          </DialogDescription>
          <div class="flex flex-row-reverse gap-x-2">
            <button
              class="rounded border border-red-400 bg-red-400 p-4 py-2 text-white outline-none transition hover:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 focus:ring-offset-1"
              @click="confirm"
            >
              {{ templateText.confirm }}
            </button>
            <button
              class="rounded border p-4 py-2 outline-none transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-1"
              @click="cancel"
            >
              {{ templateText.cancel }}
            </button>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, DialogTitle, DialogDescription, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useConfirmModal } from '../composables/useConfirmModal'

const { isShow, confirm, cancel, templateText } = useConfirmModal()
</script>

<style scoped></style>
