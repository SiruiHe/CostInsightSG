<template>
  <div class="flex flex-col col-span-full sm:col-span-6  bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">CPI VS Individual income</h2>
    </header>

    <BarChart v-if="chartData" :data="chartData" width="400" height="300" />
  </div>

  <DescriptionCard :title="'Hello'" :description="'World!'"></DescriptionCard>
</template>

<script>
  import axios from 'axios';
  import BarChart from '../../charts/BarChart.vue'
  import DescriptionCard from '../../components/DescriptionCard.vue';

  // Import utilities
  import { getCssVariable } from '../../utils/Utils'

  export default {
    name: 'DashboardCard04',
    components: {
      BarChart,
      DescriptionCard
    },
    data() {
      return {
        datasets: null,
        labelsArray: [],
        filteredData: { "cpi": [], "income": [] },
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
        await fetch('/cpi?category=income')
          .then(response => response.json())
          .then(data => {
            this.datasets = data;
          })
          .catch(error => console.error('Error:', error));
      },
      updateData() {
        this.filteredData = { "cpi": [], "income": [] };
        for (let idx in this.datasets) {
          this.labelsArray.push(this.datasets[idx].year);
          this.filteredData.cpi.push(this.datasets[idx].cpi);
          this.filteredData.income.push(this.datasets[idx].income);
        }
        this.drawChart();
      },
      drawChart() {
        this.chartData = {
          labels: this.labelsArray,
          datasets: [
            // Light blue bars
            {
              label: 'CPI',
              data: this.filteredData.cpi,
              backgroundColor: getCssVariable('--color-sky-500'),
              hoverBackgroundColor: getCssVariable('--color-sky-600'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
            // Blue bars
            {
              label: 'Income',
              data: this.filteredData.income,
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