<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Annual Consumer Price Index (CPI)</h2>

      <div class="flex items-center relative w-60">
        <svg class="absolute shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-3" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
          <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
        </svg>

        <input class="w-full rounded dark:text-gray-300 bg-white dark:bg-gray-800 focus:ring-transparent placeholder-gray-400 dark:placeholder-gray-500 appearance-none pr-6 pl-9" type="search" placeholder="Search Data Series" v-model="searchData" />

        <img :src="CloseSVG" width="16" class="absolute mr-2 cursor-pointer right-0" @click="searchData = ''">
      </div>
    </header>
    <div class="p-3">

      <!-- Table -->
      <TableVue v-if="dataset" :dataset="dataset" :headers="headers" :searchData="searchData"></TableVue>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import TableVue from '../../charts/Table.vue'
  import CloseSVG from "../../images/close.svg";
  export default {
    name: 'DashboardCard07',
    components: { TableVue },
    data() {
      return {
        dataset: [],
        datasetId: "d_dcb352661fb449c4a4c0ab23aa8d6399",
        startYear: 2014,
        endYear: 2024,
        searchData: "",
        CloseSVG,

        headers: ["Data Series", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"],
      }
    },
    async created() {
      await this.fetchDatasets()
    },
    methods: {
      async fetchDatasets() {
        const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${this.datasetId}`;

        try {
          const response = await axios.get(url);
          let dataset = response.data.result.records;
          await this.processData(dataset);
        } catch (error) {
          console.error("Error fetching dataset:", error);
        }
      },
      async processData(dataset) {
        for (let i = 0; i < dataset.length; i++) {
          let obj = { "category": null, "values": [], "index": i };
          obj.category = dataset[i].DataSeries.trim();
          for (let year = this.endYear; year >= this.startYear; year--) {
            let val = parseFloat(dataset[i][year.toString()]);
            if (isNaN(val)) val = 0;
            obj.values.push(val);
          }
          this.dataset.push(obj);
        }
      },
    },
  }
</script>