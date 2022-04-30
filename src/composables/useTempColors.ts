import { readonly, ref } from 'vue'

const selectedColor = ref('Pink')
const changeColor = (color: string) => selectedColor.value = color

const colors = {
  Pink: 'bg-pink-300 text-pink-800/80 ring-pink-400',
  Fuchsia: 'bg-fuchsia-300 text-fuchsia-800/80 ring-fuchsia-400',
  Blue: 'bg-blue-300 text-blue-800/80 ring-blue-400',
  Cyan: 'bg-cyan-300 text-cyan-800/80 ring-cyan-400',
  Teal: 'bg-teal-300 text-teal-800/80 ring-teal-400',
  Green: 'bg-green-300 text-green-800/80 ring-green-400',
  Lime: 'bg-lime-300 text-lime-800/80 ring-lime-400',
  Amber: 'bg-amber-300 text-amber-800/80 ring-amber-400',
  Orange: 'bg-orange-300 text-orange-800/80 ring-orange-400',
  Red: 'bg-red-300 text-red-800/80 ring-red-400',
  Stone: 'bg-stone-300 text-stone-800/80 ring-stone-400',
  Gray: 'bg-gray-300 text-gray-800/80 ring-gray-400'
}

export const useTempColors = () => {
  return {
    colors,
    changeColor,
    selectedColor: readonly(selectedColor)
  }
}