<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Traffic Analysis</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Traffic by Protocol</v-card-title>
          <v-card-text>
            <div class="text-center">Chart will be implemented here</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Top Applications</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="app in topApps" :key="app.id">
                <v-list-item-title>{{ app.name }}</v-list-item-title>
                <template v-slot:append>
                  <span>{{ app.traffic }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Traffic History</v-card-title>
          <v-card-text>
            <div class="text-center">Chart will be implemented here</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const topApps = ref([
  { id: 1, name: 'Web Browsing', traffic: '500 GB' },
  { id: 2, name: 'File Transfer', traffic: '300 GB' },
  { id: 3, name: 'Video Streaming', traffic: '200 GB' },
  { id: 4, name: 'Email', traffic: '100 GB' },
  { id: 5, name: 'VoIP', traffic: '50 GB' }
])
</script> 