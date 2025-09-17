<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">QoS Settings</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="activeTab">
            <v-tab value="port-groups">Port Groups</v-tab>
            <v-tab value="ip-groups">IP Groups</v-tab>
            <v-tab value="app-groups">App Groups</v-tab>
            <v-tab value="mac-groups">MAC Groups</v-tab>
            <v-tab value="site-groups">Site Groups</v-tab>
            <v-tab value="filters">Filters</v-tab>
          </v-tabs>

          <v-card-text>
            <router-view></router-view>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('port-groups')
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style> 