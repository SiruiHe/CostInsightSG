<template>
  <div class="flex flex-col col-span-full sm:col-span-6 overflow-x-auto">
    <!-- <input class="p-2"  v-model="searchData"> -->

    <div v-if="dataset.length" class="bg-white dark:bg-gray-800 shadow-xs rounded-xl flex flex-col justify-center">
      <table class="table-auto w-full dark:text-gray-300" cellspacing="0">
        <thead class="text-l uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
          <tr>
            <th v-for="(value, idx) in headers" scope="col" class="p-3 font-semibold" :key="value" :class="`${idx == 6 ? 'text-green-500': ''} ${idx == 0 ? 'text-start': 'text-center'}`">
              {{ value }}
            </th>
          </tr>
        </thead>
        <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
          <tr v-for="item in showData" :key="item.category">
            <td :title="item.category" class="p-3">
              <div class="flex items-center dark:text-gray-100 font-medium text-start">
                {{ item.category }}
              </div>
            </td>
            <td v-for="(value, idx) in item.values" :key="value" class="p-3 text-center" :class="`${idx == 5 ? 'text-green-500': ''}`"> {{ formatValue(value) }} </td>
          </tr>
        </tbody>
      </table>

      <Pagination v-if="dataset.length" :pageSize="showUnit" :total="dataset.length" @updateIndex="updateIndex"></Pagination>
    </div>

  </div>
</template>

<script>
  import { formatValue } from '../utils/Utils';
  import Pagination from "../components/Pagination.vue";

  export default {
    name: "Table",
    components: { Pagination },
    props: ['dataset', 'headers'],
    data() {
      return {
        showData: [],
        showUnit: 10,
      };
    },
    // watch: {
    //   searchData(newV, _oldV) {
    //     this.showData = []
    //     for (let item of this.dataset) {
    //       if (item.category.includes(newV)) {
    //         this.showData.push(item);
    //       }
    //     }
    //   }
    // },
    created(){
      this.showData = this.dataset.slice(0, this.showUnit);
    },
    methods: {
      updateIndex(start, end) {
        this.showData = this.dataset.slice(start, end)
      },
      formatValue(value) {
        return formatValue(value);
      }
    },
  }
</script>