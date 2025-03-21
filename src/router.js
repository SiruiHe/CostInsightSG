import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import Home from './pages/Home.vue'
import DashboardCard04Vue from './partials/dashboard/DashboardCard04.vue'
import DashboardCard07Vue from './partials/dashboard/DashboardCard07.vue'
import DashboardCard08Vue from './partials/dashboard/DashboardCard08.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: "",
          component: DashboardCard08Vue,
        },
        {
          path: "analytics",
          component: DashboardCard04Vue
        },
        {
          path: "table",
          component: DashboardCard07Vue
        }
      ]
    },
  ]
})

export default router
