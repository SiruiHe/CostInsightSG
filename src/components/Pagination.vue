<template>
  <div class="flex justify-center py-2">
    <vue-awesome-paginate :total-items="total" :maxPagesShown="3" :itemsPerPage="pageSize" v-model="currentPage"
      @update:model-value="changePage" back-button-class="arrow-btn" next-button-class="arrow-btn">
      <template #prev-button>
        <span style="overflow:hidden;">
          <span class="arrow-icon" :class="[this.currentPage == 1 ? 'disable' : '']">&lt;</span>
        </span>
      </template>
      <template #next-button>
        <span style="overflow:hidden;">
          <sapn class="arrow-icon" :class="[this.currentPage == this.pages ? 'disable' : '']">></sapn>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      currentPage: 1,
      pages: 0,
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
    this.pages = Math.ceil(this.total / this.pageSize)
    this.changePage()
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
  color: #C1C7D0;
  padding: 0 0.3rem;
  line-height: 1.1rem;
  background-color: transparent;
}

:deep(.paginate-buttons:hover) {
  border-bottom: 1px solid #C1C7D0;
}

:deep(.active-page) {
  font-weight: 700;
  font-family: Inter;
  color: #172B4D;
  border-bottom: 2px solid #172B4D;
}

:deep(.active-page:hover) {
  border-bottom: 2px solid #172B4D;
}


:deep(.arrow-btn) {
  display: flex;
  color: #172B4D;
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
