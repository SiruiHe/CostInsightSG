<template>
  <div class="min-w-fit">
    <!-- Sidebar backdrop (mobile only) -->
    <div class="fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200" :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div id="sidebar" ref="sidebar" class="flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out" :class="[variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs', sidebarOpen ? 'translate-x-0' : '-translate-x-64']">

      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button ref="trigger" class="lg:hidden text-gray-500 hover:text-gray-400" @click.stop="$emit('close-sidebar')" aria-controls="sidebar" :aria-expanded="sidebarOpen">
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <img src="../images/CostInsightSG_logo.png" alt="CostInsightSG Logo" class="w-20 h-20 object-contain">
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <h3 class="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Dashboard</span>
          </h3>
          <ul class="mt-3">
            <!-- Dashboard -->
            <router-link to="/dashboard/CPIbyIncomeGroup" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r" :class="isExactActive && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'">
                <a class="block text-gray-800 dark:text-gray-100 truncate transition" :class="isExactActive ? '' : 'hover:text-gray-900 dark:hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 fill-current" :class="currentRoute.fullPath.includes('CPIbyIncomeGroup') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm4.803 8.095c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11c.474 0 .897.22 1.171.563l.013.016.013.017A1.5 1.5 0 1 1 3.5 11Z" />
                    </svg>
                    <span class="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">CPI By Household Income Group</span>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link to="/dashboard/CPIvsIncome" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r" :class="isExactActive && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'">
                <a class="block text-gray-800 dark:text-gray-100 truncate transition" :class="isExactActive ? '' : 'hover:text-gray-900 dark:hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 fill-current" :class="currentRoute.fullPath.includes('CPIvsIncome') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z" />
                      <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
                    </svg>
                    <span class="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">CPI
                      vs Income</span>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link to="/dashboard/CPITable" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r" :class="isExactActive && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'">
                <a class="block text-gray-800 dark:text-gray-100 truncate transition" :class="isExactActive ? '' : 'hover:text-gray-900 dark:hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 fill-current" :class="currentRoute.fullPath.includes('CPITable') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M6.753 2.659a1 1 0 0 0-1.506-1.317L2.451 4.537l-.744-.744A1 1 0 1 0 .293 5.207l1.5 1.5a1 1 0 0 0 1.46-.048l3.5-4ZM6.753 10.659a1 1 0 1 0-1.506-1.317l-2.796 3.195-.744-.744a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.46-.049l3.5-4ZM8 4.5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM9 11.5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" />
                    </svg>
                    <span class="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">CPI
                      Table</span>
                  </div>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="flex mt-auto flex-col">
        <div class="hidden lg:inline-flex 2xl:hidden justify-end">
          <div class="w-12 pl-4 pr-3 py-2">
            <button class="cursor-pointer text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" @click.prevent="sidebarExpanded = !sidebarExpanded">
              <span class="sr-only">Expand / collapse sidebar</span>
              <svg class="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Ads Section -->
        <div class="px-3 py-2" :class="!sidebarExpanded? 'hidden' : ''">
          <div class="bg-slate-50 dark:bg-slate-800/25 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Sponsored</h3>
              <span class="text-xs text-slate-400 dark:text-slate-500">Ad</span>
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-300">
              <p class="font-medium">Ad here</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Anyone wanna put their ads here?</p>
            </div>
            <button class="mt-3 w-full text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
              Learn More →
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { useRouter } from 'vue-router'

  import SidebarLinkGroup from './SidebarLinkGroup.vue'

  export default {
    name: 'Sidebar',
    props: [
      'sidebarOpen',
      'variant'
    ],
    components: {
      SidebarLinkGroup,
    },
    setup(props, { emit }) {

      const trigger = ref(null)
      const sidebar = ref(null)

      const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
      const sidebarExpanded = ref(storedSidebarExpanded === null ? true : storedSidebarExpanded === 'true')

      const router = useRouter();
      const currentRoute = ref(router.currentRoute.value);

      watch(
        () => router.currentRoute.value,
        (newRoute) => {
          currentRoute.value = newRoute;
        }
      );

      // close on click outside
      const clickHandler = ({ target }) => {
        if (!sidebar.value || !trigger.value) return
        if (
          !props.sidebarOpen ||
          sidebar.value.contains(target) ||
          trigger.value.contains(target)
        ) return
        emit('close-sidebar')
      }

      // close if the esc key is pressed
      const keyHandler = ({ keyCode }) => {
        if (!props.sidebarOpen || keyCode !== 27) return
        emit('close-sidebar')
      }

      onMounted(() => {
        document.addEventListener('click', clickHandler)
        document.addEventListener('keydown', keyHandler)
      })

      onUnmounted(() => {
        document.removeEventListener('click', clickHandler)
        document.removeEventListener('keydown', keyHandler)
      })

      watch(sidebarExpanded, () => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.value)
        if (sidebarExpanded.value) {
          document.querySelector('body').classList.add('sidebar-expanded')
        } else {
          document.querySelector('body').classList.remove('sidebar-expanded')
        }
      })

      return {
        trigger,
        sidebar,
        sidebarExpanded,
        currentRoute
      }
    }
  }

</script>

<style scoped>
  div {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
</style>