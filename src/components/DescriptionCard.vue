<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ this.title }}</div>
      <p v-for="val, idx in addLineBreaks(this.description)" :key="val" class="text-gray-700 text-base dark:text-gray-500">
        {{ idx+1 + ". " + val }}
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
    methods: {
      addLineBreaks(text) {
        let processedText = text.replace(/(?<!\d)(?<!\b(?:vs|e\.g|i\.e))([.!?])\s+/g, '$1\n');
        return processedText.split('\n');
        // return text;
      }
    }
  }
</script>

<style scoped>
  p {
    white-space: pre-wrap;
    text-align: justify;
    overflow-wrap: break-word;
  }
</style>