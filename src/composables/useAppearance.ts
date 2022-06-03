import { computed, readonly, ref, watch, watchEffect } from 'vue'
import { useSupabase } from './useSupabase'
import { useAuthStore } from '../store/auth'

const { supabase } = useSupabase()
const authStore = useAuthStore()

type Theme = {
  user_id: string,
  background_color: keyof typeof backgroundColors,
  button_color: keyof typeof buttonColors,
  radius: typeof radiusList[number],
  shadow: typeof shadowList[number]
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
  await supabase
    .from('theme')
    .update({ background_color: color })
    .eq('user_id', authStore.user?.id)
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
  await supabase.from('theme').update({ button_color: color }).eq('user_id', authStore.user?.id)
}

// radius
const radiusList = ['rounded-none', 'rounded', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-[30px]'] as const
const selectedRadius = ref<typeof radiusList[number]>(radiusList[1])
const changeRadius = async (radius: typeof radiusList[number]) => {
  selectedRadius.value = radius
  await supabase.from('theme').update({ radius }).eq('user_id', authStore.user?.id)
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
  await supabase.from('theme').update({ shadow }).eq('user_id', authStore.user?.id)
}

// filled
const filled = ref(true)
const isLoading = ref(false)

const buttonClass = computed(() => {
  let textColor: string
  // 當按鈕是outlined，背景又是深色時，文字要變成淺色
  // 否則就維持原本顏色
  textColor =
    !filled.value && selectedBackgroundColor.value === 'Black'
      ? 'text-white'
      : buttonColors[selectedButtonColor.value].match(/(text-\S+)/)![0]

  // 當按鈕是outlined，背景又是淺色時，Black按鈕的文字要變成深色
  // 否則就維持原本顏色
  if (!filled.value && selectedBackgroundColor.value !== 'Black' && selectedButtonColor.value === 'Black') {
    textColor = 'text-gray-800'
  }

  return [
    selectedRadius.value,
    selectedShadow.value,
    filled.value
      ? buttonColors[selectedButtonColor.value]
      : buttonColors[selectedButtonColor.value].match(/border-\S+/g)!.join(' '),
    textColor
  ]
})

watch(
  () => authStore.user?.id,
  async () => {
    if (!authStore.user?.id) return
    const now = new Date().getTime()
    try {
      isLoading.value = true
      let { data: theme, error } = await supabase
        .from<Theme>('theme')
        .select('button_color, background_color, radius, shadow')
        .eq('user_id', authStore.user?.id)
  
      selectedBackgroundColor.value = theme?.[0].background_color || selectedBackgroundColor.value
      selectedButtonColor.value = theme?.[0].button_color || selectedButtonColor.value
      selectedRadius.value = theme?.[0].radius || selectedRadius.value
      selectedShadow.value = theme?.[0].shadow || selectedShadow.value
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 1000 - (new Date().getTime() - now));
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
    filled,
    buttonClass,
    isLoading
  }
}
