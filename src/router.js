import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import HomePage from './pages/HomePage.vue'
import DashboardBarChartVue from './partials/dashboard/DashboardBarChart.vue'
import DashboardTableVue from './partials/dashboard/DashboardTable.vue'
import DashboadLineChartVue from './partials/dashboard/DashboadLineChart.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
      {
        path: "CPIbyIncomeGroup",
        component: DashboadLineChartVue,
      },
      {
        path: "CPIvsIncome",
        component: DashboardBarChartVue
      },
      {
        path: "CPITable",
        component: DashboardTableVue
      }
    ]
    },
  ]
})

export default router
