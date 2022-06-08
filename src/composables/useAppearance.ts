import { computed, readonly, Ref, ref, watch, watchEffect } from 'vue'
import { useSupabase } from './useSupabase'
import { useAuthStore } from '../store/auth'

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
const backgroundColors = {
  White: 'bg-white',
  Gray: 'bg-gray-200',
  Black: 'bg-black',
  Pink: 'bg-pink-200',
  Fuchsia: 'bg-fuchsia-200',
  Blue: 'bg-blue-200',
  Cyan: 'bg-cyan-200',
  Teal: 'bg-teal-200',
  Green: 'bg-green-200',
  Lime: 'bg-lime-200',
  Amber: 'bg-amber-200',
  Orange: 'bg-orange-200',
  Red: 'bg-red-200'
} as const
const selectedBackgroundColor = ref<keyof typeof backgroundColors>('White')
const changeBackgroundColor = async (color: keyof typeof backgroundColors) => {
  selectedBackgroundColor.value = color
  await supabase.from('theme').update({ background_color: color }).eq('user_name', authStore.userName)
}

// button colors
const buttonColors = {
  White: 'bg-white hover:bg-gray-50 text-gray-800/80 ring-gray-400 border-white hover:border-gray-50',
  Gray: 'bg-gray-200 hover:bg-gray-300 text-gray-800/80 ring-gray-400 border-gray-200 hover:border-gray-300',
  Black: 'bg-black hover:bg-gray-800 text-white/80 ring-gray-800 border-black hover:border-gray-800',
  Pink: 'bg-pink-200 hover:bg-pink-300 text-gray-800/80 ring-pink-400 border-pink-200 hover:border-pink-300',
  Fuchsia:
    'bg-fuchsia-200 hover:bg-fuchsia-300 text-gray-800/80 ring-fuchsia-400 border-fuchsia-200 hover:border-fuchsia-300',
  Blue: 'bg-blue-200 hover:bg-blue-300 text-gray-800/80 ring-blue-400 border-blue-200 hover:border-blue-300',
  Cyan: 'bg-cyan-200 hover:bg-cyan-300 text-gray-800/80 ring-cyan-400 border-cyan-200 hover:border-cyan-300',
  Teal: 'bg-teal-200 hover:bg-teal-300 text-gray-800/80 ring-teal-400 border-teal-200 hover:border-teal-300',
  Green: 'bg-green-200 hover:bg-green-300 text-gray-800/80 ring-green-400 border-green-200 hover:border-green-300',
  Lime: 'bg-lime-200 hover:bg-lime-300 text-gray-800/80 ring-lime-400 border-lime-200 hover:border-lime-300',
  Amber: 'bg-amber-200 hover:bg-amber-300 text-gray-800/80 ring-amber-400 border-amber-200 hover:border-amber-300',
  Orange:
    'bg-orange-200 hover:bg-orange-300 text-gray-800/80 ring-orange-400 border-orange-200 hover:border-orange-300',
  Red: 'bg-red-200 hover:bg-red-300 text-gray-800/80 ring-red-400 border-red-200 hover:border-red-300'
} as const
const selectedButtonColor = ref<keyof typeof buttonColors>('Gray')
const changeButtonColor = async (color: keyof typeof buttonColors) => {
  selectedButtonColor.value = color
  await supabase.from('theme').update({ button_color: color }).eq('user_name', authStore.userName)
}

// radius
const radiusList = ['rounded-none', 'rounded', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-[30px]'] as const
const selectedRadius = ref<typeof radiusList[number]>(radiusList[1])
const changeRadius = async (radius: typeof radiusList[number]) => {
  selectedRadius.value = radius
  await supabase.from('theme').update({ radius }).eq('user_name', authStore.userName)
}

// shadow
const shadowList = [
  'shadow-none',
  'shadow shadow-gray-600/30',
  'shadow-md shadow-gray-600/30',
  'shadow-lg shadow-gray-600/30',
  'shadow-[4px_4px] shadow-gray-800'
] as const
const selectedShadow = ref<typeof shadowList[number]>(shadowList[0])
const changeShadow = async (shadow: typeof shadowList[number]) => {
  selectedShadow.value = shadow
  await supabase.from('theme').update({ shadow }).eq('user_name', authStore.userName)
}

// filled
const isFilled = ref(true)
watch(isFilled, () => changeFill(isFilled.value))
const changeFill = async (filled: boolean) => {
  isFilled.value = filled
  await supabase.from('theme').update({ filled }).eq('user_name', authStore.userName)
}

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

export function getButtonClass(
  filled: boolean,
  selectedBackgroundColor: keyof typeof backgroundColors,
  selectedButtonColor: keyof typeof buttonColors,
  selectedRadius: typeof radiusList[number],
  selectedShadow: typeof shadowList[number]
) {
  let textColor = ''
  if (!filled) textColor = selectedBackgroundColor === 'Black' ? 'text-white' : 'text-gray-800/80'

  return [
    selectedRadius,
    selectedShadow,
    filled ? buttonColors[selectedButtonColor] : buttonColors[selectedButtonColor].match(/border-\S+/g)!.join(' '),
    textColor
  ]
}
