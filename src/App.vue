<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component"></component>
      </Suspense>
    </template>
  </RouterView>
</template>

<script setup lang="ts">
console.group('App.vue')
console.log('App重啟')
console.groupEnd()
</script>

<style></style>
