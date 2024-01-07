<script setup lang="ts">
import TablerCircleDashed from '~icons/tabler/circle-dashed'
import TablerCircleCheck from '~icons/tabler/circle-check'

const props = defineProps<{
  checkCondition: boolean
}>()

</script>

<template>
  <li class="flex items-center gap-1 text-gray-600 text-sm">
    <Transition name="fade" mode="out-in">
      <TablerCircleCheck v-if="props.checkCondition" class="w-4 h-4 text-brand-2" />
      <TablerCircleDashed v-else class="w-4 h-4" />
    </Transition>
    <slot />
  </li>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease-in;
}

.fade-enter-from {
  opacity: .2;
  transform: rotate(-60deg);
}
.fade-leave-to {
  opacity: .2;
  transform: rotate(60deg);
}
</style>
