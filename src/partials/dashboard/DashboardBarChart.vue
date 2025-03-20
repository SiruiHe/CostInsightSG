<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">CPI VS Individual income</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
    <BarChart v-if="chartData" :data="chartData" width="600" height="480" />
  </div>
</template>

<script>
  import axios from 'axios';
  import BarChart from '../../charts/BarChart.vue'

  // Import utilities
  import { getCssVariable } from '../../utils/Utils'

  export default {
    name: 'DashboardCard04',
    components: {
      BarChart,
    },
    data() {
      return {
        datasets: null,
        datasetIds: [
          "d_dcb352661fb449c4a4c0ab23aa8d6399", // CPI
          "d_0fb1c8d8f8e4f7733e0486837e54a0c7", // Income
        ],
        startYear: 2004,
        endYear: 2023,
        labelsArray: [],
        filteredData: [],
        selectedCategory: 'All Items',
        chartData: null,
      };
    },
    async created() {
      this.labelsArray = Array.from({ length: this.endYear - this.startYear + 1 }, (v, i) => (this.startYear + i).toString());
      await this.fetchDatasets();
      this.updateData();
    },
    methods: {
      async fetchDatasets() {
        const urls = this.datasetIds.map(id => `https://data.gov.sg/api/action/datastore_search?resource_id=${id}`);

        try {
          this.datasets = await Promise.all(urls.map(url => axios.get(url)));
          console.log(this.datasets);
        } catch (error) {
          console.error("Error fetching datasets:", error);
        }
      },
      updateData() {
        this.filteredData = [];
        // CPI
        let records = this.datasets[0].data.result.records;
        let categoryObj = records.find(record => { if (record.DataSeries === this.selectedCategory) return record; });

        if (categoryObj) {
          let yearData = [];
          for (let year = this.startYear; year <= this.endYear; year++) {
            yearData.push(parseFloat(categoryObj[year.toString()]));
          }
          this.filteredData.push(yearData);
        }

        // Income
        records = this.datasets[1].data.result.records;
        let yearData = [];
        let standard = records[15].total_income/records[15].no_of_indv_assessed;
        for (let i = 0; i < records.length; i++) {
          yearData.push(parseFloat(records[i].total_income/records[i].no_of_indv_assessed/standard*100));
        }
        this.filteredData.push(yearData);
        this.drawChart();
      },
      drawChart() {
        this.chartData = {
          labels: this.labelsArray,
          datasets: [
            // Light blue bars
            {
              label: 'CPI',
              data: this.filteredData[0],
              backgroundColor: getCssVariable('--color-sky-500'),
              hoverBackgroundColor: getCssVariable('--color-sky-600'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
            // Blue bars
            {
              label: 'Income',
              data: this.filteredData[1],
              backgroundColor: getCssVariable('--color-violet-500'),
              hoverBackgroundColor: getCssVariable('--color-violet-600'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
          ],
        }
      },
    }
  }
</script>