import { ref } from 'vue'

const isShow = ref(false)
const callback = ref<Function>()

export const useConfirmModal = () => {
  const openModal = (cb: Function) => {
    isShow.value = true
    callback.value = cb
  }
  const confirm = () => {
    callback.value!()
    isShow.value = false
  }
  const cancle = () => {
    isShow.value = false
  }
  return {
    isShow,
    openModal,
    confirm,
    cancle
  }
}
