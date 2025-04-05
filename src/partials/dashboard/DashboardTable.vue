<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Annual Consumer Price Index (CPI)</h2>

      <div class="flex items-center relative w-70">
        <FilterButton v-if="selectedFilters.length" :labels="selectedFilters" @update:filters="updateFilters" />
        <div class="flex items-center ms-2">
          <svg class="absolute shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-3" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
          </svg>

          <input class="w-full rounded dark:text-gray-300 bg-white dark:bg-gray-800 focus:ring-transparent placeholder-gray-400 dark:placeholder-gray-500 appearance-none pr-6 pl-9" type="search" placeholder="Search Data Series" v-model="searchData" />

          <img :src="CloseSVG" width="16" class="absolute mr-2 cursor-pointer right-0" @click="searchData = ''">
        </div>
      </div>
    </header>
    <div class="p-3">

      <!-- Table -->
      <TableVue v-if="dataset" :dataset="dataset" :headers="headers" :searchData="searchData" :selectedFilters="selectedFilters"></TableVue>
    </div>
  </div>
</template>

<script>
  import TableVue from '../../charts/Table.vue'
  import CloseSVG from "../../images/close.svg";
  import FilterButton from '../../components/DropdownFilter.vue'
  export default {
    name: 'DashboardCard07',
    components: { TableVue, FilterButton },
    data() {
      return {
        dataset: [],
        datasetId: "d_dcb352661fb449c4a4c0ab23aa8d6399",
        startYear: 2014,
        endYear: 2025,
        searchData: "",
        selectedFilters: [],

        CloseSVG,
        headers: ["Data Series", "Label", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"]
      }
    },
    async created() {
      await this.fetchDatasets()
    },
    methods: {
      async fetchDatasets() {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL_2;
        await fetch(`${apiBaseUrl}/getAllCPI`)
          .then(response => response.json())
          .then(async data => {
            let dataset = data;
            console.log(dataset)
            await this.processData(dataset);
          })
          .catch(error => console.error('Error:', error));
      },
      async processData(dataset) {
        let selectedFilters = new Set();
        dataset.forEach((data, i) => {
          let obj = { "category": data.category, "values": [], "index": i, "label": data.label };
          selectedFilters.add(data.label)
          for (let year = this.endYear, index = data.value.length-1; year >= this.startYear; year--, index--) {
            let val = 0;
            if (index >= 0 && year == parseInt(Object.keys(data.value[index])[0])) {
              val = data.value[index][year];
            }
            obj.values.push(val);
          }
          this.dataset.push(obj);
        })
        this.selectedFilters = Array.from(selectedFilters);
      },
      updateFilters(filters) {
        this.selectedFilters = filters;
      },
    },
  }
</script>