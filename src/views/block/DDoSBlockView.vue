<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            DDoS Block Management
            <v-spacer></v-spacer>
            <v-switch
              v-model="ddosProtection"
              label="DDoS Protection"
              color="success"
              hide-details
              density="compact"
              class="ml-4"
            ></v-switch>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Current Status</v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon :color="stats.status === 'Normal' ? 'success' : 'error'">
                            {{ stats.status === 'Normal' ? 'mdi-shield-check' : 'mdi-shield-alert' }}
                          </v-icon>
                        </template>
                        <v-list-item-title>Network Status</v-list-item-title>
                        <v-list-item-subtitle>{{ stats.status }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-chart-line</v-icon>
                        </template>
                        <v-list-item-title>Current Traffic Rate</v-list-item-title>
                        <v-list-item-subtitle>{{ stats.trafficRate }} Mbps</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="warning">mdi-shield-lock</v-icon>
                        </template>
                        <v-list-item-title>Blocked Attacks</v-list-item-title>
                        <v-list-item-subtitle>{{ stats.blockedAttacks }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Protection Settings</v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-slider
                        v-model="settings.threshold"
                        label="Traffic Threshold (Mbps)"
                        min="100"
                        max="10000"
                        step="100"
                        thumb-label
                      ></v-slider>
                      <v-slider
                        v-model="settings.duration"
                        label="Block Duration (minutes)"
                        min="5"
                        max="60"
                        step="5"
                        thumb-label
                      ></v-slider>
                      <v-select
                        v-model="settings.action"
                        :items="blockActions"
                        label="Block Action"
                        required
                      ></v-select>
                      <v-btn
                        color="primary"
                        block
                        @click="saveSettings"
                        :disabled="!valid"
                      >
                        Save Settings
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Blocked IP Addresses
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
                      :items="blockedIPs"
                      :search="search"
                    >
                      <template v-slot:item.status="{ item }">
                        <v-chip
                          :color="item.status === 'Blocked' ? 'error' : 'warning'"
                          small
                        >
                          {{ item.status }}
                        </v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          icon
                          small
                          color="primary"
                          @click="unblockIP(item)"
                        >
                          <v-icon>mdi-lock-open</v-icon>
                        </v-btn>
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

const ddosProtection = ref(true)
const valid = ref(true)
const search = ref('')

const stats = ref({
  status: 'Normal',
  trafficRate: 450,
  blockedAttacks: 127
})

const settings = ref({
  threshold: 1000,
  duration: 15,
  action: 'Block Traffic'
})

const blockActions = [
  'Block Traffic',
  'Rate Limit',
  'Alert Only'
]

const headers = [
  { title: 'IP Address', key: 'ip' },
  { title: 'First Detected', key: 'firstDetected' },
  { title: 'Last Attack', key: 'lastAttack' },
  { title: 'Attack Type', key: 'attackType' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const blockedIPs = ref([
  {
    ip: '192.168.1.100',
    firstDetected: '2024-03-15 10:30:25',
    lastAttack: '2024-03-15 10:45:12',
    attackType: 'SYN Flood',
    status: 'Blocked'
  },
  {
    ip: '192.168.1.101',
    firstDetected: '2024-03-15 11:15:30',
    lastAttack: '2024-03-15 11:20:45',
    attackType: 'UDP Flood',
    status: 'Monitoring'
  },
  {
    ip: '192.168.1.102',
    firstDetected: '2024-03-15 12:00:15',
    lastAttack: '2024-03-15 12:10:30',
    attackType: 'HTTP Flood',
    status: 'Blocked'
  }
])

function saveSettings() {
  // TODO: Implement settings save logic
  console.log('Saving settings:', settings.value)
}

function unblockIP(item) {
  // TODO: Implement unblock logic
  console.log('Unblocking IP:', item.ip)
}
</script>

<style scoped>
.v-list-item {
  min-height: 48px;
}

.v-card-title {
  padding: 16px;
}

.v-card-text {
  padding: 16px;
}
</style> 