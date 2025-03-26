<template>
  <span class="inline-block rounded-full py-1  dark:text-gray-950 font-medium w-100 text-center" :style="{ 'background-color': this.styleMap[this.label].color}">
    {{ this.styleMap[this.label].text }}
  </span>
</template>

<script>
  export default {
    props: ['label'],
    data() {
      return {
        styleMap: {
          "All items": { "text": "All", "color": "#BCDFF6" },
          "Food": { "text": "Food", "color": "#C8E5E4" },
          "Clothing & Footwear": { "text": "Fashion", "color": "#ECDAEA" },
          "Housing & Utilities": { "text": "Housing", "color": "#EAE2B2" },
          "Household Durables": { "text": "Durables", "color": "#DBEDDC" },
          "Health Care": { "text": "Health", "color": "#D1CFE4" },
          "Transport": { "text": "Transport", "color": "#EFE3DF" },
          "Communication": { "text": "Connect", "color": "#CBE3CD" },
          "Recreation & Culture": { "text": "Culture", "color": "#F5B2AE" },
          "Education": { "text": "Education", "color": "#F2F2CF" },
          "Miscellaneous Goods & Services": { "text": "Misc", "color": "#E0DEE4" }
        },
      }
    },
  }
</script>