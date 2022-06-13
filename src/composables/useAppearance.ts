import { computed, readonly, Ref, ref, watch } from 'vue'
import { useSupabase } from './useSupabase'
import { useAuthStore } from '../store/auth'
import { backgroundColors, buttonColors, radiusList, shadowList } from '../data'
import { getButtonClass } from '../utils'

const { supabase } = useSupabase()
const authStore = useAuthStore()

export type Theme = {
  user_name?: string
  background_color: keyof typeof backgroundColors
  button_color: keyof typeof buttonColors
  radius: typeof radiusList[number]
  shadow: typeof shadowList[number]
  filled: boolean
}

// background colors
const selectedBackgroundColor = ref<keyof typeof backgroundColors>('White')
const changeBackgroundColor = generateChangeFunction(selectedBackgroundColor, 'background_color')

// button colors
const selectedButtonColor = ref<keyof typeof buttonColors>('Gray')
const changeButtonColor = generateChangeFunction(selectedButtonColor, 'button_color')

// radius
const selectedRadius = ref<typeof radiusList[number]>(radiusList[1])
const changeRadius = generateChangeFunction(selectedRadius, 'radius')

// shadow
const selectedShadow = ref<typeof shadowList[number]>(shadowList[0])
const changeShadow = generateChangeFunction(selectedShadow, 'shadow')

// filled
const isFilled = ref(true)
const changeFill = generateChangeFunction(isFilled, 'filled')
watch(isFilled, () => changeFill(isFilled.value))

const isLoading = ref(false)

const buttonClass = computed(() => {
  return getButtonClass(
    isFilled.value,
    selectedBackgroundColor.value,
    selectedButtonColor.value,
    selectedRadius.value,
    selectedShadow.value
  )
})

watch(
  () => authStore.user?.id,
  async (userId) => {
    isLoading.value = true
    if (!userId) return
    try {
      const { data } = await supabase
        .from('theme')
        .select(`button_color, background_color, radius, shadow, filled, profile:profiles!inner(id)`)
        .eq('profiles.id', userId)

      const theme = data?.[0] as Theme

      selectedBackgroundColor.value = theme.background_color || selectedBackgroundColor.value
      selectedButtonColor.value = theme.button_color || selectedButtonColor.value
      selectedRadius.value = theme.radius || selectedRadius.value
      selectedShadow.value = theme.shadow || selectedShadow.value
      isFilled.value = theme.filled
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true }
)

export const useAppearance = () => {
  return {
    buttonColors,
    selectedButtonColor: readonly(selectedButtonColor),
    changeButtonColor,
    backgroundColors,
    selectedBackgroundColor: readonly(selectedBackgroundColor),
    changeBackgroundColor,
    radiusList,
    selectedRadius: readonly(selectedRadius),
    changeRadius,
    shadowList,
    selectedShadow: readonly(selectedShadow),
    changeShadow,
    isFilled,
    changeFill,
    buttonClass,
    isLoading
  }
}

function generateChangeFunction<T>(targetRef: Ref<T>, columnName: string) {
  return async function (changeTo: T) {
    targetRef.value = changeTo
    await supabase
      .from('theme')
      .update({ [columnName]: changeTo })
      .eq('user_name', authStore.userName)
  }
}
