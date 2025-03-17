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
              <div class="flex items-center dark:text-gray-100 font-medium text-center">
                {{ item.category }}
              </div>
            </td>
            <td v-for="(value, idx) in item.values" :key="value" class="p-3 text-center" :class="`${idx == 5 ? 'text-green-500': ''}`"> {{ formatValue(value) }} </td>
          </tr>
        </tbody>
      </table>

      <Pagination :pageSize="showUnit" :total="dataset.length" @updateIndex="updateIndex"></Pagination>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import { formatValue } from '../utils/Utils';
  import Pagination from "../components/Pagination.vue";

  export default {
    name: "Table",
    components: { Pagination },
    data() {
      return {
        dataset: [],
        datasetId: "d_dcb352661fb449c4a4c0ab23aa8d6399",
        startYear: 2014,
        endYear: 2024,
        showData: [],
        showUnit: 10,
        searchData: '',

        headers: ["Data Series", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"],
      };
    },
    async created() {
      await this.fetchDatasets()
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
    methods: {
      async fetchDatasets() {
        const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${this.datasetId}`;

        try {
          const response = await axios.get(url);
          let dataset = response.data.result.records;
          await this.processData(dataset);
          this.showData = this.dataset.slice(0, this.showUnit);
        } catch (error) {
          console.error("Error fetching dataset:", error);
        }
      },
      async processData(dataset) {
        for (let i = 0; i < dataset.length; i++) {
          let obj = { "category": null, "values": [] }
          obj.category = dataset[i].DataSeries.trim()
          for (let year = this.endYear; year >= this.startYear; year--) {
            obj.values.push(parseFloat(dataset[i][year.toString()]));
          }
          this.dataset.push(obj);
        }
      },

      updateIndex(start, end) {
        this.showData = this.dataset.slice(start, end)
      },
      formatValue(value) {
        return formatValue(value);
      }
    },
  }
</script>