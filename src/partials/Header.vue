<template>
  <header
    class="sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30"
    :class="[
      variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'max-lg:shadow-xs lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90',
      variant === 'v2' ? 'dark:before:bg-gray-800' : '',
      variant === 'v3' ? 'dark:before:bg-gray-900' : '',
    ]"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-center justify-between h-16"
        :class="variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200 dark:border-gray-700/60'"
      >

        <!-- Header: Left side -->
        <div class="flex">

          <!-- Hamburger button -->
          <button class="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden" @click.stop="$emit('toggle-sidebar')" aria-controls="sidebar" :aria-expanded="sidebarOpen">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>

        </div>

        <div class="hidden lg:flex flex-1 justify-center">
          <div class="bg-slate-50 dark:bg-slate-800/25 rounded-lg p-3 h-16 w-96">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Sponsored</h3>
              <span class="text-xs text-slate-400 dark:text-slate-500">Ad</span>
            </div>
            <div class="text-xs text-slate-600 dark:text-slate-300">
              <p class="font-medium">Ad from Google Adsense</p>
            </div>
          </div>
        </div>

        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          
          <!-- <Notifications align="right" /> -->
          <Help align="right" />
          <ThemeToggle />
          
          <!-- Divider -->
          <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />

        </div>

      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'

import Help from '../components/DropdownHelp.vue'
import ThemeToggle from '../components/ThemeToggle.vue'

export default {
  name: 'Header',
  props: [
    'sidebarOpen',
    'variant',
  ],
  components: {
    Help,
    ThemeToggle,
  },
  setup() {
    const searchModalOpen = ref(false)
    return {
      searchModalOpen,
    }  
  }  
}
</script>