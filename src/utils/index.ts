import type { backgroundColors, radiusList, shadowList } from '@/data'
import { buttonColors } from '@/data'

export function isValidUrl(url: string) {
  const urlReg = /^(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return urlReg.test(url)
}

export function isValidEmail(email: string) {
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return emailReg.test(email)
}

export function getButtonClass(
  filled: boolean,
  selectedBackgroundColor: keyof typeof backgroundColors,
  selectedButtonColor: keyof typeof buttonColors,
  selectedRadius: typeof radiusList[number],
  selectedShadow: typeof shadowList[number],
) {
  let textColor = ''
  if (!filled)
    textColor = selectedBackgroundColor === 'Black' ? 'text-white' : 'text-gray-800/80'

  return [
    selectedRadius,
    selectedShadow,
    filled ? buttonColors[selectedButtonColor] : buttonColors[selectedButtonColor].match(/(hover:)?border-\S+/g)!.join(' '),
    textColor,
  ]
}

export function getURL() {
  let url
    = import.meta.env?.VITE_SITE_URL // Set this to your site URL in production env.
    ?? import.meta.env?.VITE_VERCEL_URL // Automatically set by Vercel.
    ?? 'http://localhost:8080/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}
