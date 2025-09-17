<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Dashboard</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title class="text-subtitle-1">
            Total Traffic
          </v-card-title>
          <v-card-text class="text-h5">
            1.2 TB
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title class="text-subtitle-1">
            Active Sessions
          </v-card-title>
          <v-card-text class="text-h5">
            2,345
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title class="text-subtitle-1">
            Blocked Attempts
          </v-card-title>
          <v-card-text class="text-h5">
            156
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card>
          <v-card-title class="text-subtitle-1">
            System Status
          </v-card-title>
          <v-card-text>
            <v-chip color="success" label>
              <v-icon start icon="mdi-check-circle"></v-icon>
              Healthy
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-title>Traffic Overview</v-card-title>
          <v-card-text>
            <div class="chart-placeholder" style="height: 300px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
              Chart will be implemented here
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title>Recent Events</v-card-title>
          <v-list lines="two">
            <v-list-item
              v-for="(event, i) in recentEvents"
              :key="i"
              :subtitle="event.time"
              :title="event.message"
            >
              <template v-slot:prepend>
                <v-icon :color="event.color" :icon="event.icon"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const recentEvents = [
  {
    message: 'System update completed',
    time: '5 minutes ago',
    color: 'success',
    icon: 'mdi-check-circle'
  },
  {
    message: 'High traffic alert detected',
    time: '15 minutes ago',
    color: 'warning',
    icon: 'mdi-alert'
  },
  {
    message: 'New policy applied',
    time: '1 hour ago',
    color: 'info',
    icon: 'mdi-shield'
  },
  {
    message: 'Blocked suspicious IP',
    time: '2 hours ago',
    color: 'error',
    icon: 'mdi-block-helper'
  }
]
</script> 