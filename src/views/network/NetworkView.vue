<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs
            v-model="activeTab"
            show-arrows
          >
            <v-tab to="/network/bypass">
              <v-icon start>mdi-route</v-icon>
              Bypass
            </v-tab>
            <v-tab to="/network/data-management">
              <v-icon start>mdi-database</v-icon>
              Data Management
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
</script> 