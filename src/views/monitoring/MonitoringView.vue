<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Network Monitoring</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="activeTab">
            <v-tab value="l7-monitoring">L7 Monitoring</v-tab>
            <v-tab value="ip-traffic">IP Traffic</v-tab>
            <v-tab value="traffic-analysis">Traffic Analysis</v-tab>
          </v-tabs>

          <v-card-text>
            <router-view></router-view>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Real-time Statistics
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="text-subtitle-1">Total Traffic</div>
                <div class="text-h5">{{ stats.totalTraffic }} GB</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1">Active Sessions</div>
                <div class="text-h5">{{ stats.activeSessions }}</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1">Bandwidth Usage</div>
                <div class="text-h5">{{ stats.bandwidthUsage }}%</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1">Packet Loss</div>
                <div class="text-h5">{{ stats.packetLoss }}%</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            System Health
            <v-spacer></v-spacer>
            <v-chip
              :color="systemHealth.status === 'Healthy' ? 'success' : 'error'"
              small
            >
              {{ systemHealth.status }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="text-subtitle-1">CPU Usage</div>
                <v-progress-linear
                  :model-value="systemHealth.cpuUsage"
                  color="primary"
                  height="25"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ value }}%</strong>
                  </template>
                </v-progress-linear>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1">Memory Usage</div>
                <v-progress-linear
                  :model-value="systemHealth.memoryUsage"
                  color="primary"
                  height="25"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ value }}%</strong>
                  </template>
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeTab = ref('l7-monitoring')

// Set initial tab based on route
onMounted(() => {
  const path = route.path.split('/')
  if (path.length > 2) {
    activeTab.value = path[path.length - 1]
  }
})

// Watch for tab changes and update route
watch(activeTab, (newValue) => {
  router.push(`/monitor/${newValue}`)
})

// Watch for route changes and update tab
watch(
  () => route.path,
  (newPath) => {
    const path = newPath.split('/')
    if (path.length > 2) {
      activeTab.value = path[path.length - 1]
    }
  }
)

const stats = ref({
  totalTraffic: 256.8,
  activeSessions: 1458,
  bandwidthUsage: 45.2,
  packetLoss: 0.05
})

const systemHealth = ref({
  status: 'Healthy',
  cpuUsage: 35,
  memoryUsage: 60
})
</script>

<style scoped>
.v-card {
  height: 100%;
}

.text-subtitle-1 {
  color: rgba(0, 0, 0, 0.6);
}

.v-progress-linear {
  margin-top: 8px;
}
</style> 