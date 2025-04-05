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
    <LineChart v-if="chartData" :data="chartData" width="400" height="300" />

  </div>
  <DescriptionCard :title="'Analysis'" :description="analysis"></DescriptionCard>
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
        analysis: "",
        categoryArray: ["All Items", "Food", "Transport", "Recreation & Culture", "Education", "Health Care", "Household Durables & Services", "Miscellaneous Goods & Services", "Communication", "Clothing & Footwear", "Housing & Utilities"],
        labelsArray: [],
        filteredData: { "Highest": [], "Lowest": [], "Middle": [] },
        selectedCategory: 'All Items',
        chartData: null,
      };
    },
    async created() {
      await this.updateData();
    },
    methods: {
      async fetchDatasets() {
        const category = encodeURIComponent(this.selectedCategory);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        await fetch(`${apiBaseUrl}/cpi?category=${category}`)
          .then(response => response.json())
          .then(data => {
            this.datasets = data.cpi_data;
            this.analysis = data.analysis;
          })
          .catch(error => console.error('Error:', error));
      },
      async updateData() {
        await this.fetchDatasets();
        this.filteredData = { "Highest": [], "Lowest": [], "Middle": [] };
        this.labelsArray = [];
        for (let idx in this.datasets) {
          this.labelsArray.push(this.datasets[idx].year);

          this.filteredData.Highest.push(this.datasets[idx].Highest);
          this.filteredData.Middle.push(this.datasets[idx].Middle);
          this.filteredData.Lowest.push(this.datasets[idx].Lowest);
        }
        this.drawChart();
      },
      drawChart() {
        this.chartData = {
          labels: this.labelsArray,
          datasets: [
            // Indigo line
            {
              label: 'Middle 60%',
              data: this.filteredData.Middle,
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
              data: this.filteredData.Lowest,
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
              data: this.filteredData.Highest,
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