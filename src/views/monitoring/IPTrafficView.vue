<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            IP Traffic Monitor
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search IP"
              single-line
              hide-details
              density="compact"
            ></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="ipTraffic"
              :search="search"
            >
              <template v-slot:item.trafficIn="{ item }">
                <v-progress-linear
                  :model-value="getTrafficPercentage(item.trafficIn)"
                  height="20"
                  color="success"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ item.trafficIn }} MB/s</strong>
                  </template>
                </v-progress-linear>
              </template>

              <template v-slot:item.trafficOut="{ item }">
                <v-progress-linear
                  :model-value="getTrafficPercentage(item.trafficOut)"
                  height="20"
                  color="error"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ item.trafficOut }} MB/s</strong>
                  </template>
                </v-progress-linear>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Top IP Sources</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="source in topSources"
                :key="source.ip"
                :title="source.ip"
                :subtitle="`${source.location}`"
              >
                <template v-slot:prepend>
                  <v-icon :color="source.color">mdi-desktop-tower</v-icon>
                </template>
                <template v-slot:append>
                  <div class="text-caption">{{ source.traffic }} MB/s</div>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Network Usage by Subnet</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="subnet in subnetUsage"
                :key="subnet.network"
                :title="subnet.network"
                :subtitle="`${subnet.description}`"
              >
                <template v-slot:append>
                  <div class="text-caption">{{ subnet.usage }}%</div>
                </template>
                <v-progress-linear
                  :model-value="subnet.usage"
                  height="20"
                  :color="getUsageColor(subnet.usage)"
                  class="mt-2"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ value }}%</strong>
                  </template>
                </v-progress-linear>
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

const search = ref('')

const headers = [
  { title: 'IP Address', key: 'ip' },
  { title: 'Host Name', key: 'hostname' },
  { title: 'Traffic In', key: 'trafficIn' },
  { title: 'Traffic Out', key: 'trafficOut' },
  { title: 'Total Sessions', key: 'sessions' }
]

const ipTraffic = ref([
  {
    ip: '192.168.1.100',
    hostname: 'workstation-1',
    trafficIn: 5.2,
    trafficOut: 2.1,
    sessions: 45
  },
  {
    ip: '192.168.1.101',
    hostname: 'server-1',
    trafficIn: 15.7,
    trafficOut: 8.3,
    sessions: 128
  },
  {
    ip: '192.168.1.102',
    hostname: 'developer-pc',
    trafficIn: 3.8,
    trafficOut: 1.5,
    sessions: 23
  }
])

const topSources = ref([
  {
    ip: '192.168.1.101',
    location: 'Server Room',
    traffic: 24.0,
    color: 'error'
  },
  {
    ip: '192.168.1.100',
    location: 'Office Area',
    traffic: 7.3,
    color: 'warning'
  },
  {
    ip: '192.168.1.102',
    location: 'Development',
    traffic: 5.3,
    color: 'success'
  }
])

const subnetUsage = ref([
  {
    network: '192.168.1.0/24',
    description: 'Office Network',
    usage: 75
  },
  {
    network: '192.168.2.0/24',
    description: 'Server Network',
    usage: 45
  },
  {
    network: '192.168.3.0/24',
    description: 'Guest Network',
    usage: 25
  }
])

function getTrafficPercentage(traffic) {
  const maxTraffic = 20 // Maximum traffic in MB/s
  return (traffic / maxTraffic) * 100
}

function getUsageColor(usage) {
  if (usage > 80) return 'error'
  if (usage > 60) return 'warning'
  return 'success'
}
</script>

<style scoped>
.v-progress-linear {
  margin-top: 8px;
}

.v-list-item {
  margin-bottom: 8px;
}
</style> 