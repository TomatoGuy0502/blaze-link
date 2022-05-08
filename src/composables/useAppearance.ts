import { readonly, ref } from 'vue'

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
  Red: 'bg-red-200',
}
const selectedBackgroundColor = ref<keyof typeof backgroundColors>('White')
const changeBackgroundColor = (color: keyof typeof backgroundColors) => (selectedBackgroundColor.value = color)

const buttonColors = {
  White: 'bg-white hover:bg-gray-50 text-gray-700/80 ring-gray-400 border-white hover:border-gray-50',
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
  Red: 'bg-red-200 hover:bg-red-300 text-gray-800/80 ring-red-400 border-red-200 hover:border-red-300',
}
const selectedButtonColor = ref<keyof typeof buttonColors>('Gray')
const changeButtonColor = (color: keyof typeof buttonColors) => (selectedButtonColor.value = color)

const radiusList = ['rounded-none', 'rounded', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-[30px]'] as const
const selectedRadius = ref<typeof radiusList[number]>(radiusList[1])
const changeRadius = (radius: typeof radiusList[number]) => {
  selectedRadius.value = radius
}

const shadowList = [
  'shadow-none',
  'shadow shadow-gray-600/30',
  'shadow-md shadow-gray-600/30',
  'shadow-lg shadow-gray-600/30',
  'shadow-[4px_4px] shadow-gray-800'
] as const
const selectedShadow = ref<typeof shadowList[number]>(shadowList[1])
const changeShadow = (shadow: typeof shadowList[number]) => {
  selectedShadow.value = shadow
}

const filled = ref(true)

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
    filled
  }
}
