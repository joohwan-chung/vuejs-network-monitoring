<template>
  <v-layout>
    <app-header @toggle-drawer="drawer = !drawer" />
    <app-sidebar v-model="drawer" />
    
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'

const drawer = ref(true)
</script>

<style scoped>
.v-main {
  background-color: #f5f5f5;
}
</style> 