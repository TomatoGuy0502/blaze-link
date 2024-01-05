<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useConfirmModal } from '../composables/useConfirmModal'

const { isShow, isLoading, confirm, cancel, templateText } = useConfirmModal()
</script>

<template>
  <TransitionRoot appear as="template" :show="isShow">
    <Dialog class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto" @close="cancel">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      </TransitionChild>

      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <DialogPanel class="min-w-[300px] max-w-sm transform rounded-xl bg-white p-4 shadow transition-all">
          <DialogTitle class="mb-2 text-lg font-medium leading-6 text-gray-900">
            {{ templateText.title }}
          </DialogTitle>
          <DialogDescription class="mb-4 text-sm text-gray-500 whitespace-pre-line">
            {{ templateText.description }}
          </DialogDescription>
          <div class="flex flex-row-reverse gap-x-2">
            <button
              class="rounded border border-red-400 bg-red-400 p-4 py-2 text-white outline-none transition hover:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 focus:ring-offset-1 disabled:cursor-wait disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent"
              :disabled="isLoading"
              @click="confirm"
            >
              {{ templateText.confirm }}
            </button>
            <button
              class="rounded border p-4 py-2 outline-none transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              :disabled="isLoading"
              @click="cancel"
            >
              {{ templateText.cancel }}
            </button>
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
