<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Consumer Price Index (CPI) By Household Income Group</h2>

      <div class="inline-block relative w-64">
        <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800" v-model="selectedCategory" @change="updateData">
          <option v-for="category in categoryArray" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

    </header>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
    <LineChart v-if="chartData" :data="chartData" width="600" height="400" />

  </div>
  <DescriptionCard :title="selectedCategory" :description="'World!'"></DescriptionCard>
</template>

<script>
  import axios from 'axios';
  import LineChart from '../../charts/LineChart.vue'
  import DescriptionCard from '../../components/DescriptionCard.vue';

  // Import utilities
  import { getCssVariable } from '../../utils/Utils'

  export default {
    name: 'DashboardCard08',
    components: {
      LineChart,
      DescriptionCard
    },
    data() {
      return {
        datasets: null,
        datasetIds: [
          "d_8f3660871b62f38609915ee7ef45ee2c", // 60
          "d_36c4af91ffd0a75f6b557960efcb476e", // low 20
          "d_c5bde9ed17cef8c365629311f8550ce2"  // high 20
        ],
        startYear: 2004,
        endYear: 2024,
        labelsArray: [],
        categoryArray: ["All Items", "Food", "Transport", "Recreation & Culture", "Education", "Health Care", "Household Durables", "Miscellaneous Goods & Services", "Communication", "Clothing & Footwear", "Housing & Utilities"],
        filteredData: [],
        selectedCategory: 'All Items',
        chartData: null,
      };
    },
    async created() {
      await this.fetchDatasets();
      this.updateData();
    },
    methods: {
      async fetchDatasets() {
        const urls = this.datasetIds.map(id => `https://data.gov.sg/api/action/datastore_search?resource_id=${id}`);

        try {
          this.datasets = await Promise.all(urls.map(url => axios.get(url)));
        } catch (error) {
          console.error("Error fetching datasets:", error);
        }
      },
      updateData() {
        this.filteredData = [];
        this.labelsArray = [];
        for (let i = 0; i < this.datasets.length; i++) {
          let records = this.datasets[i].data.result.records;
          let categoryObj = records.find(record => { if (record.DataSeries.trim() === this.selectedCategory) return record; });

          if (categoryObj) {
            let yearData = [];
            for (let yearStr in categoryObj) {
              let year = parseFloat(yearStr);
              if (!isNaN(year) && !isNaN(categoryObj[year])) {
                this.labelsArray.push(year.toString());
                yearData.push(parseFloat(categoryObj[year]));
              }
            }
            this.filteredData.push(yearData);
          }
        }
        this.labelsArray = Array.from(new Set(this.labelsArray)).sort((a, b) => a - b);
        this.drawChart();
      },
      drawChart() {
        this.chartData = {
          labels: this.labelsArray,
          datasets: [
            // Indigo line
            {
              label: 'Middle 60%',
              data: this.filteredData[0],
              borderColor: getCssVariable('--color-violet-500'),
              fill: false,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: getCssVariable('--color-violet-500'),
              pointHoverBackgroundColor: getCssVariable('--color-violet-500'),
              pointBorderWidth: 0,
              pointHoverBorderWidth: 0,
              clip: 20,
              tension: 0.2,
            },
            // Blue line
            {
              label: 'Lowest 20%',
              data: this.filteredData[1],
              borderColor: getCssVariable('--color-sky-500'),
              fill: false,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: getCssVariable('--color-sky-500'),
              clip: 20,
              tension: 0.2,
            },
            // Green line
            {
              label: 'Highest 20%',
              data: this.filteredData[2],
              borderColor: getCssVariable('--color-green-500'),
              fill: false,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: getCssVariable('--color-green-500'),
              clip: 20,
              tension: 0.2,
            },
          ],
        }
      }
    }
  }
</script>