<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Application Traffic
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              density="compact"
            ></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="applications"
              :search="search"
            >
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="item.status === 'Active' ? 'success' : 'error'"
                  small
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.bandwidth="{ item }">
                <v-progress-linear
                  :model-value="getBandwidthPercentage(item.bandwidth)"
                  height="20"
                  color="primary"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ item.bandwidth }} Mbps ({{ value }}%)</strong>
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
          <v-card-title>Top Applications by Traffic</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="app in topApplications"
                :key="app.name"
                :title="app.name"
                :subtitle="`${app.traffic} GB`"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary">
                    <v-icon>{{ app.icon }}</v-icon>
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-chip small>{{ app.percentage }}%</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Protocol Distribution</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="protocol in protocolDistribution"
                :key="protocol.name"
                :title="protocol.name"
              >
                <template v-slot:append>
                  <div class="text-caption">{{ protocol.percentage }}%</div>
                </template>
                <v-progress-linear
                  :model-value="protocol.percentage"
                  height="20"
                  :color="protocol.color"
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
  { title: 'Application', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Status', key: 'status' },
  { title: 'Sessions', key: 'sessions' },
  { title: 'Bandwidth', key: 'bandwidth' }
]

const applications = ref([
  {
    name: 'Web Browsing',
    category: 'Web',
    status: 'Active',
    sessions: 245,
    bandwidth: 50
  },
  {
    name: 'Video Streaming',
    category: 'Streaming',
    status: 'Active',
    sessions: 78,
    bandwidth: 150
  },
  {
    name: 'File Sharing',
    category: 'P2P',
    status: 'Inactive',
    sessions: 0,
    bandwidth: 0
  },
  {
    name: 'VoIP',
    category: 'Communication',
    status: 'Active',
    sessions: 32,
    bandwidth: 15
  }
])

const topApplications = ref([
  {
    name: 'YouTube',
    traffic: 125.5,
    percentage: 35,
    icon: 'mdi-youtube'
  },
  {
    name: 'Netflix',
    traffic: 98.2,
    percentage: 28,
    icon: 'mdi-netflix'
  },
  {
    name: 'Web Browser',
    traffic: 45.8,
    percentage: 15,
    icon: 'mdi-web'
  },
  {
    name: 'File Download',
    traffic: 35.2,
    percentage: 12,
    icon: 'mdi-download'
  }
])

const protocolDistribution = ref([
  {
    name: 'HTTP/HTTPS',
    percentage: 45,
    color: 'primary'
  },
  {
    name: 'RTMP/RTSP',
    percentage: 30,
    color: 'success'
  },
  {
    name: 'FTP',
    percentage: 15,
    color: 'warning'
  },
  {
    name: 'Others',
    percentage: 10,
    color: 'error'
  }
])

function getBandwidthPercentage(bandwidth) {
  const maxBandwidth = 200 // Maximum bandwidth in Mbps
  return (bandwidth / maxBandwidth) * 100
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