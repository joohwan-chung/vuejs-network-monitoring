<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs
            v-model="activeTab"
            show-arrows
          >
            <v-tab to="/system/settings">
              <v-icon start>mdi-cog</v-icon>
              Settings
            </v-tab>
            <v-tab to="/system/logs">
              <v-icon start>mdi-text-box-search</v-icon>
              Logs
            </v-tab>
            <v-tab to="/system/users">
              <v-icon start>mdi-account-group</v-icon>
              Users
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