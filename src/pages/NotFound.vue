<script setup lang="ts">
</script>

<template>
  <div class="pattern flex h-dvh items-center justify-center">
    <div class="bg-gray-800/50 w-full">
      <div class="flex flex-col max-w-[1200px] text-center p-8 md:p-12 rounded-xl mx-auto">
        <p class="font-black text-4xl md:text-6xl text-white">
          Oops!
        </p>
        <h1 class="font-black text-[120px] md:text-[140px] leading-none text-white mb-8">
          404
        </h1>
        <p class=" font-black text-3xl md:text-5xl text-white/90">
          It seems we took a wrong turn somewhere. Let's <router-link to="/" class="underline">
            get you back
          </router-link> on track
        </p>
      </div>
    </div>
  </div>
</template>
