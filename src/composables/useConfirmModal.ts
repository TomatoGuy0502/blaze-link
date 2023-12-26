import { reactive, ref } from 'vue'

const isShow = ref(false)
const isLoading = ref(false)
const callback = ref<Function>(() => {})

const templateText = reactive({
  title: '再次確認',
  description: '即將進行此動作，確定嗎？',
  confirm: '確定',
  cancel: '取消',
})

export function useConfirmModal() {
  const openModal = (
    cb: Function,
    {
      title,
      description,
      confirm,
      cancel,
    }: { title?: string, description?: string, confirm?: string, cancel?: string } = {},
  ) => {
    isShow.value = true
    callback.value = cb
    templateText.title = title || '再次確認'
    templateText.description = description || '即將進行此動作，確定嗎？'
    templateText.confirm = confirm || '確定'
    templateText.cancel = cancel || '取消'
  }
  const confirm = async () => {
    try {
      isLoading.value = true
      await callback.value()
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isLoading.value = false
    }
    isShow.value = false
  }
  const cancel = () => {
    !isLoading.value && (isShow.value = false)
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
