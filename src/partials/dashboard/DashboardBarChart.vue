<template>
  <div class="flex flex-col col-span-full sm:col-span-6  bg-white dark:bg-gray-800 shadow-xs rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <div class="flex">
        <h2 class="font-semibold text-gray-800 dark:text-gray-100">CPI vs. Individual income</h2>
        <HelpTip :content="tipContent" :width="9"></HelpTip>
      </div>
    </header>

    <BarChart v-if="chartData" :data="chartData" width="400" height="300" />
  </div>

  <DescriptionCard :title="'Analysis'" :description="analysis"></DescriptionCard>
</template>

<script>
  import BarChart from '../../charts/BarChart.vue'
  import DescriptionCard from '../../components/DescriptionCard.vue';
  import HelpTip from '../../components/HelpTip.vue';

  // Import utilities
  import { getCssVariable } from '../../utils/Utils'

  export default {
    name: 'DashboardCard04',
    components: {
      BarChart, DescriptionCard, HelpTip
    },
    data() {
      return {
        datasets: null,
        analysis: "",
        labelsArray: [],
        filteredData: { "cpi": [], "income": [] },
        selectedCategory: 'All Items',
        tipContent: "2019 is the base year",
        chartData: null,
      };
    },
    async created() {
      await this.fetchDatasets();
      this.updateData();
    },
    methods: {
      async fetchDatasets() {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL_1;
        await fetch(`${apiBaseUrl}/cpi?category=income`)
          .then(response => response.json())
          .then(data => {
            this.datasets = data.cpi_data;
            this.analysis = data.analysis;
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