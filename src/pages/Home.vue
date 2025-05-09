<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header />

      <!-- Main content -->
      <main class="grow">
        <div class="min-h-screen bg-white dark:bg-slate-900">
          <!-- Hero Section -->
          <div class="relative overflow-hidden bg-white dark:bg-slate-900">
            <div class="max-w-7xl mx-auto">
              <div class="relative z-10 pb-8 sm:pb-10 md:pb-10 lg:pb-22 xl:pb-28">
                <div class="mt-10 mx-auto max-w-7xl">
                  <div class="lg:grid lg:grid-cols-12 lg:gap-8">
                    <!-- Text Content -->
                    <div class="flex flex-col px-4 sm:px-6 sm:text-center lg:col-span-8 lg:text-left">
                      <h1
                        class="text-4xl tracking-tight font-extrabold text-slate-800 dark:text-slate-100 sm:text-5xl md:text-6xl">
                        <span class="block">Welcome to</span>
                        <span class="block text-indigo-600 dark:text-indigo-400">CostInsightSG</span>
                      </h1>
                      <p
                        class="mt-3 text-base text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        A Cloud-Based Platform for Cost of Living Analysis and Forecasting in Singapore
                      </p>
                      <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div class="rounded-md shadow">
                          <RouterLink to="/dashboard"
                            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                            Go to Dashboard
                          </RouterLink>
                        </div>
                      </div>
                    </div>

                    <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:col-span-4 lg:flex lg:items-center">
                      <div class="relative mx-auto w-full lg:max-w-md">
                        <div class="w-full h-80 flex items-center justify-center">
                          <img src="../images/CostInsightSG_logo.png" alt="CostInsightSG Logo"
                            class="w-64 h-64 object-contain">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Section -->
          <div class="py-12 bg-slate-50 dark:bg-slate-800/25">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center">
                <h2 class="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                  Features</h2>
                <p
                  class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
                  Better Financial Management
                </p>
              </div>

              <div class="mt-10">
                <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                  <div class="relative">
                    <dt>
                      <div
                        class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p class="ml-16 text-lg leading-6 font-medium text-slate-800 dark:text-slate-100">CPI Analytics
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-slate-500 dark:text-slate-400">
                      Detailed visualizations into historic CPI patterns with interactive charts.
                    </dd>
                  </div>

                  <div class="relative">
                    <dt>
                      <div
                        class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p class="ml-16 text-lg leading-6 font-medium text-slate-800 dark:text-slate-100">Latest
                        Tracking</p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-slate-500 dark:text-slate-400">
                      Compare with the latest official data and stay on top of your budget.
                    </dd>
                  </div>

                  <div class="relative">
                    <dt>
                      <div
                        class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p class="ml-16 text-lg leading-6 font-medium text-slate-800 dark:text-slate-100">Smart Insights
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-slate-500 dark:text-slate-400">
                      Get AI-powered insights to optimize your spending.
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CPI Explanation Section -->
          <div class="py-16 bg-white dark:bg-slate-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center mb-12">
                <h2 class="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                  Understanding CPI</h2>
                <p
                  class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
                  What is Consumer Price Index?
                </p>
              </div>

              <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div class="bg-slate-50 dark:bg-slate-800/25 rounded-lg p-8 shadow-sm">
                  <h3 class="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">What is CPI?</h3>
                  <p class="text-slate-600 dark:text-slate-300 mb-4">
                    The Consumer Price Index (CPI) measures the average change in prices paid by urban consumers for a basket of goods and services over time. It's a key indicator of inflation and reflects how the cost of living changes for households in Singapore.
                  </p>
                  <p class="text-slate-600 dark:text-slate-300">
                    CPI is calculated by tracking price changes for a representative basket of consumer goods and services, including food, housing, transportation, healthcare, and education. The index is published monthly by the Department of Statistics Singapore.
                  </p>
                </div>

                <div class="bg-slate-50 dark:bg-slate-800/25 rounded-lg p-8 shadow-sm">
                  <h3 class="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">How CPI Helps You?</h3>
                  <p class="text-slate-600 dark:text-slate-300 mb-4">
                    Understanding CPI trends can help you make informed financial decisions. By tracking how prices change over time, you can better plan your budget, adjust your spending habits, and make strategic investment choices.
                  </p>
                  <p class="text-slate-600 dark:text-slate-300">
                    Our visualizations breaks down CPI data by income groups, allowing you to see how inflation affects different segments of society. This helps you understand your purchasing power and make adjustments to maintain your standard of living.
                  </p>
                </div>
              </div>

              <div class="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8 shadow-sm">
                <h3 class="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-4">Key Benefits of CPI Knowledge</h3>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-base font-medium text-slate-800 dark:text-slate-100">Better Budget Planning</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Anticipate price changes with our Machine Learning forecasts and adjust your budget accordingly</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-base font-medium text-slate-800 dark:text-slate-100">Informed Purchasing</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Know when to buy and which categories are experiencing inflation</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-base font-medium text-slate-800 dark:text-slate-100">Financial Security</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Protect your purchasing power and maintain your standard of living</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dashboard Views Section -->
          <div class="py-12 bg-white dark:bg-slate-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center mb-12">
                <h2 class="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                  Dashboard Views</h2>
                <p
                  class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
                  Explore Our Analytics
                </p>
              </div>

              <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                <!-- Overview Card -->
                <RouterLink to="/dashboard" class="transform hover:scale-105 transition-transform duration-200">
                  <div class="bg-slate-50 dark:bg-slate-800/25 overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <div class="ml-5">
                          <h3 class="text-lg font-medium text-slate-800 dark:text-slate-100">Overview Dashboard</h3>
                          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Get a comprehensive view of your financial metrics and key indicators
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RouterLink>

                <!-- Analytics Card -->
                <RouterLink to="/dashboard/CPIvsIncome"
                  class="transform hover:scale-105 transition-transform duration-200">
                  <div class="bg-slate-50 dark:bg-slate-800/25 overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div class="ml-5">
                          <h3 class="text-lg font-medium text-slate-800 dark:text-slate-100">Analytics</h3>
                          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Deep dive into detailed analytics and historical trends
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RouterLink>

                <!-- Data Table Card -->
                <RouterLink to="/dashboard/CPITable"
                  class="transform hover:scale-105 transition-transform duration-200">
                  <div class="bg-slate-50 dark:bg-slate-800/25 overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div class="ml-5">
                          <h3 class="text-lg font-medium text-slate-800 dark:text-slate-100">Data Table</h3>
                          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            View and analyze raw data in a detailed tabular format
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<script>
import Header from '../partials/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>