<template>
  <div class="relative flex" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <img :src="HelpSVG" width="18" class="ml-2">
    <div v-if="isTooltipVisible" class="tooltip py-1 px-2 text-xs text-gray-50 bg-gray-500 dark:bg-gray-600/50" :style="{ width: this.width + 'rem'}">
      {{ this.content }}
    </div>
  </div>
</template>

<script>
  import HelpSVG from "../images/help.svg";
  export default {
    props: ['content', 'width'],
    data() {
      return {
        HelpSVG,
        isTooltipVisible: false
      }
    },
    methods: {
      showTooltip() {
        this.isTooltipVisible = true;
      },
      hideTooltip() {
        this.isTooltipVisible = false;
      }
    }
  }
</script>

<style scoped>
  .tooltip {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    white-space: pre-line;
    border-radius: 4px;
    z-index: 1000;
  }
</style>