<template>
  <v-app>
    <main-layout v-if="isAuthenticated" />
    <router-view v-else></router-view>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from './store'
import MainLayout from './layout/MainLayout.vue'

const store = useMainStore()
const isAuthenticated = computed(() => store.isAuthenticated)
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style> 