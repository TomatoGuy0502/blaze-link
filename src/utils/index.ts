import { backgroundColors, buttonColors, radiusList, shadowList } from "../data"

export const isValidUrl = (url: string) => {
  const urlReg = /(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return urlReg.test(url)
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
    filled ? buttonColors[selectedButtonColor] : buttonColors[selectedButtonColor].match(/(hover:)?border-\S+/g)!.join(' '),
    textColor
  ]
}
