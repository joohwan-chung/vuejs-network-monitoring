<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Network Monitoring</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h6 mb-2">Total Traffic</div>
            <div class="text-h4">1.2 TB</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h6 mb-2">Active Sessions</div>
            <div class="text-h4">2,345</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h6 mb-2">Blocked Attempts</div>
            <div class="text-h4">156</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card>
          <v-card-text class="text-center">
            <div class="text-h6 mb-2">System Status</div>
            <v-chip color="success" class="text-h6">Healthy</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Recent Events</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="event in recentEvents" :key="event.id">
                <template v-slot:prepend>
                  <v-icon :color="event.color">{{ event.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ event.message }}</v-list-item-title>
                <template v-slot:append>
                  <span class="text-caption">{{ event.time }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const recentEvents = ref([
  {
    id: 1,
    message: 'System update completed',
    time: '5 minutes ago',
    icon: 'mdi-check-circle',
    color: 'success'
  },
  {
    id: 2,
    message: 'High traffic alert detected',
    time: '15 minutes ago',
    icon: 'mdi-alert',
    color: 'warning'
  },
  {
    id: 3,
    message: 'New policy applied',
    time: '1 hour ago',
    icon: 'mdi-shield',
    color: 'info'
  },
  {
    id: 4,
    message: 'Blocked suspicious IP',
    time: '2 hours ago',
    icon: 'mdi-block-helper',
    color: 'error'
  }
])
</script> 