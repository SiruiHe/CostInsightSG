<template>
  <div class="flex justify-center py-2 dark:bg-gray-800">
    <vue-awesome-paginate :total-items="total" :maxPagesShown="3" :itemsPerPage="pageSize" v-model="currentPage" @update:model-value="changePage" back-button-class="arrow-btn" next-button-class="arrow-btn">
      <template #prev-button>
        <span style="overflow: hidden;">
          <span class="arrow-icon" :class="[this.currentPage == 1 ? 'disable' : '']">&lt;</span>
        </span>
      </template>
      <template #next-button>
        <span style="overflow: hidden;">
          <span class="arrow-icon" :class="[this.currentPage == this.pages ? 'disable' : '']">></span>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script>
  import { useDark } from '@vueuse/core'
  export default {
    name: "Pagination",
    data() {
      return {
        currentPage: 1,
        pages: 0,

        darkMode: null
      }
    },
    emits: ["updateIndex"],
    props: {
      pageSize: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 1
      }
    },
    created() {
      this.darkMode = useDark();
      this.pages = Math.ceil(this.total / this.pageSize);
      this.changePage();
    },
    watch: {
      total(newV, _oldV) {
        this.pages = Math.ceil(this.total / this.pageSize)
        this.currentPage = 1;
      },
      darkMode(newV, _oldV) {
        if (newV) {
          document.documentElement.style.setProperty('--focus-color', '#c1c7d0');
          document.documentElement.style.setProperty('--other-color', '#374151');
        } else {
          document.documentElement.style.setProperty('--focus-color', '#374151');
          document.documentElement.style.setProperty('--other-color', '#c1c7d0');
        }
      },
    },
    beforeDestroy() {
      this.observer.disconnect();
    },
    methods: {
      changePage() {
        let startIndex = (this.currentPage - 1) * this.pageSize
        let endIndex = startIndex + this.pageSize
        this.$emit("updateIndex", startIndex, endIndex)
      },
    }
  }
</script>

<style scoped>
  .pagination-container {
    align-items: center;
    gap: 1.25rem;
  }

  ul {
    margin: 0;
  }

  :deep(.paginate-buttons) {
    border: 1px solid transparent;
    font-family: Inter;
    color: var(--other-color);
    padding: 0 0.3rem;
    line-height: 1.1rem;
    background-color: transparent;
  }

  :deep(.active-page) {
    font-weight: 700;
    font-family: Inter;
    color: var(--focus-color);
    border-bottom: 2px solid var(--focus-color);
  }

  :deep(.arrow-btn) {
    display: flex;
    color: var(--focus-color);
    padding: 0;
  }

  :deep(.arrow-btn:hover) {
    border-bottom: 1px solid transparent;
    line-height: 1.1rem;
  }

  .arrow-icon {
    padding: 0 0.75rem;
  }

  .disable {
    display: none;
  }
</style>
