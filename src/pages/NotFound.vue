<script setup lang="ts">
</script>

<template>
  <div class="pattern flex h-dvh items-center justify-center">
    <div class="w-full bg-gray-800/50">
      <div class="mx-auto flex max-w-[1200px] flex-col rounded-xl p-8 text-center md:p-12">
        <p class="text-4xl font-black text-white md:text-6xl">
          Oops!
        </p>
        <h1 class="mb-8 text-[120px] font-black leading-none text-white md:text-[140px]">
          404
        </h1>
        <p class=" text-3xl font-black text-white/90 md:text-5xl">
          It seems we took a wrong turn somewhere. Let's <router-link to="/" class="underline">
            get you back
          </router-link> on track
        </p>
      </div>
    </div>
  </div>
</template>
