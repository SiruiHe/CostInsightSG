<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Annual Consumer Price Index (CPI)</h2>
    </header>
    <div class="p-3">

      <!-- Table -->
      <TableVue v-if="dataset" :dataset="dataset" :headers="headers"></TableVue>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import TableVue from '../../charts/Table.vue'
  export default {
    name: 'DashboardCard07',
    components: { TableVue },
    data() {
      return {
        dataset: [],
        datasetId: "d_dcb352661fb449c4a4c0ab23aa8d6399",
        startYear: 2014,
        endYear: 2024,

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
          let obj = { "category": null, "values": [] }
          obj.category = dataset[i].DataSeries.trim()
          for (let year = this.endYear; year >= this.startYear; year--) {
            obj.values.push(parseFloat(dataset[i][year.toString()]));
          }
          this.dataset.push(obj);
        }
      },
    },
  }
</script>