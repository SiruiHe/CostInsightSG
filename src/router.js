import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import DashboardCard04Vue from './partials/dashboard/DashboardCard04.vue'
import DashboardCard08Vue from './partials/dashboard/DashboardCard08.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
      {
        path: "/",
        component: DashboardCard08Vue,
      },
      {
        path: "analytics",
        component: DashboardCard04Vue
      }
    ]
    },
  ]
})

export default router
