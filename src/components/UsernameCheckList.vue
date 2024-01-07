<script setup lang="ts">
import CheckListItem from './CheckListItem.vue'
import { useUsername } from '@/composables/useUsername'

const props = defineProps<{
  username: string
}>()

const { isValidLength, isValidCharacters, isValidStartEnd } = useUsername(() => props.username)
</script>

<template>
  <ul class="flex flex-col gap-0.5 pl-2">
    <CheckListItem :check-condition="isValidLength">
      長度為3~20個字元
    </CheckListItem>
    <CheckListItem :check-condition="isValidCharacters">
      只能包含英文、數字、底線(_)、點(.)、減號(-)
    </CheckListItem>
    <CheckListItem :check-condition="isValidStartEnd">
      開頭與結尾必須是英文、數字或底線(_)
    </CheckListItem>
  </ul>
</template>
