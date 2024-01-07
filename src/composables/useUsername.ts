import type { MaybeRefOrGetter } from 'vue'
import { computed, toRef } from 'vue'
import { preservedIds } from '@/router'

export function useUsername(_username: MaybeRefOrGetter<string>) {
  const username = toRef(_username)

  const isValidLength = computed(() => username.value.length >= 3 && username.value.length <= 20)
  const isValidCharacters = computed(() => /^[a-zA-Z0-9_.-]+$/.test(username.value))
  const isValidStartEnd = computed(() => /^[a-zA-Z0-9_].*[a-zA-Z0-9_]$/.test(username.value))
  const isPreserved = computed(() => preservedIds.includes(username.value.toLowerCase()))

  const isValid = computed(() => isValidLength.value && isValidCharacters.value && isValidStartEnd.value && !isPreserved.value)

  return {
    isValid,
    isValidLength,
    isValidCharacters,
    isValidStartEnd,
    isPreserved,
  }
}
