<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Annual Consumer Price Index (CPI)</h2>
    </header>
    <div class="p-3">

      <!-- Table -->
      <TableVue></TableVue>
    </div>
  </div>
</template>

<script>
import TableVue from '../../charts/Table.vue'
export default {
  name: 'DashboardCard07',
  components: { TableVue }
}
</script>