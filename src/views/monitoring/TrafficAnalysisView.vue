<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Traffic Analysis
            <v-spacer></v-spacer>
            <v-select
              v-model="timeRange"
              :items="timeRanges"
              label="Time Range"
              hide-details
              density="compact"
              style="max-width: 200px"
            ></v-select>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Traffic Volume</v-card-title>
                  <v-card-text>
                    <div class="d-flex justify-space-between mb-2">
                      <div>
                        <div class="text-h6">{{ stats.totalVolume }} GB</div>
                        <div class="text-caption">Total Volume</div>
                      </div>
                      <div>
                        <div class="text-h6">{{ stats.peakRate }} Mbps</div>
                        <div class="text-caption">Peak Rate</div>
                      </div>
                      <div>
                        <div class="text-h6">{{ stats.avgRate }} Mbps</div>
                        <div class="text-caption">Average Rate</div>
                      </div>
                    </div>
                    <!-- Chart placeholder -->
                    <div class="traffic-chart"></div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Traffic Distribution</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <div class="text-subtitle-1">By Protocol</div>
                        <v-list density="compact">
                          <v-list-item
                            v-for="protocol in protocolDistribution"
                            :key="protocol.name"
                            :title="`${protocol.name} (${protocol.percentage}%)`"
                          >
                            <template v-slot:prepend>
                              <v-icon :color="protocol.color">{{ protocol.icon }}</v-icon>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="6">
                        <div class="text-subtitle-1">By Application</div>
                        <v-list density="compact">
                          <v-list-item
                            v-for="app in applicationDistribution"
                            :key="app.name"
                            :title="`${app.name} (${app.percentage}%)`"
                          >
                            <template v-slot:prepend>
                              <v-icon :color="app.color">{{ app.icon }}</v-icon>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12">
                <v-card>
                  <v-card-title>Traffic Patterns</v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers="patternHeaders"
                      :items="trafficPatterns"
                      :search="search"
                    >
                      <template v-slot:item.trend="{ item }">
                        <v-icon
                          :color="item.trend === 'up' ? 'error' : 'success'"
                        >
                          {{ item.trend === 'up' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                        </v-icon>
                        {{ item.trendValue }}%
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const timeRange = ref('24h')

const timeRanges = [
  { title: 'Last 24 Hours', value: '24h' },
  { title: 'Last 7 Days', value: '7d' },
  { title: 'Last 30 Days', value: '30d' }
]

const stats = ref({
  totalVolume: 1256.8,
  peakRate: 850,
  avgRate: 425
})

const protocolDistribution = ref([
  {
    name: 'HTTP/HTTPS',
    percentage: 45,
    color: 'primary',
    icon: 'mdi-web'
  },
  {
    name: 'Database',
    percentage: 25,
    color: 'success',
    icon: 'mdi-database'
  },
  {
    name: 'Email',
    percentage: 15,
    color: 'warning',
    icon: 'mdi-email'
  },
  {
    name: 'Others',
    percentage: 15,
    color: 'error',
    icon: 'mdi-dots-horizontal'
  }
])

const applicationDistribution = ref([
  {
    name: 'Web Browser',
    percentage: 35,
    color: 'primary',
    icon: 'mdi-web'
  },
  {
    name: 'File Transfer',
    percentage: 25,
    color: 'success',
    icon: 'mdi-file-transfer'
  },
  {
    name: 'Streaming',
    percentage: 20,
    color: 'warning',
    icon: 'mdi-play-circle'
  },
  {
    name: 'Others',
    percentage: 20,
    color: 'error',
    icon: 'mdi-dots-horizontal'
  }
])

const patternHeaders = [
  { title: 'Pattern Type', key: 'type' },
  { title: 'Description', key: 'description' },
  { title: 'Occurrence', key: 'occurrence' },
  { title: 'Average Duration', key: 'duration' },
  { title: 'Trend', key: 'trend' }
]

const trafficPatterns = ref([
  {
    type: 'Peak Hours',
    description: 'High traffic during business hours',
    occurrence: 'Daily',
    duration: '8-10 hours',
    trend: 'up',
    trendValue: 15
  },
  {
    type: 'Backup Window',
    description: 'Increased traffic during backup',
    occurrence: 'Daily',
    duration: '2-3 hours',
    trend: 'down',
    trendValue: 5
  },
  {
    type: 'Low Activity',
    description: 'Minimal traffic during off-hours',
    occurrence: 'Daily',
    duration: '6-8 hours',
    trend: 'down',
    trendValue: 10
  }
])
</script>

<style scoped>
.traffic-chart {
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-top: 16px;
}

.v-list-item {
  min-height: 40px;
}
</style> 