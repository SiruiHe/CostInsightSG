<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ this.title }}</div>
      <p class="text-gray-700 text-base dark:text-gray-500">
        {{ this.description }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'description'],
    data() {
      return {}
    },
  }
</script>