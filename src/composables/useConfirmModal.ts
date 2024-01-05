import { reactive, ref } from 'vue'

const isShow = ref(false)
const isLoading = ref(false)
const confirmCallback = ref<Function>(() => {})
const cancelCallback = ref<Function>(() => {})

const templateText = reactive({
  title: '再次確認',
  description: '即將進行此動作，確定嗎？',
  confirm: '確定',
  cancel: '取消',
})

export function useConfirmModal() {
  const openModal = (
    onConfirm: Function,
    {
      title,
      description,
      confirm,
      cancel,
    }: { title?: string, description?: string, confirm?: string, cancel?: string } = {},
    onCancel?: Function,
  ) => {
    isShow.value = true
    confirmCallback.value = onConfirm
    templateText.title = title || '再次確認'
    templateText.description = description || '即將進行此動作，確定嗎？'
    templateText.confirm = confirm || '確定'
    templateText.cancel = cancel || '取消'
    cancelCallback.value = onCancel || (() => {})
  }
  const confirm = async () => {
    try {
      isLoading.value = true
      await confirmCallback.value()
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isLoading.value = false
    }
    isShow.value = false
  }
  const cancel = async () => {
    try {
      !isLoading.value && (isShow.value = false)
      await cancelCallback.value()
    } catch (error) {
      console.error(error)
    }
  }
  return {
    isShow,
    isLoading,
    templateText,
    openModal,
    confirm,
    cancel,
  }
}
