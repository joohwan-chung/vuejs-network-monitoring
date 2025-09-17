<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Traffic Settings</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Bandwidth Control
            <v-spacer></v-spacer>
            <v-switch
              v-model="bandwidthControl.enabled"
              label="Enable"
              hide-details
            ></v-switch>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="bandwidthControl.maxUpload"
                  label="Maximum Upload (Mbps)"
                  type="number"
                  :disabled="!bandwidthControl.enabled"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="bandwidthControl.maxDownload"
                  label="Maximum Download (Mbps)"
                  type="number"
                  :disabled="!bandwidthControl.enabled"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Traffic Shaping
            <v-spacer></v-spacer>
            <v-switch
              v-model="trafficShaping.enabled"
              label="Enable"
              hide-details
            ></v-switch>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="trafficShaping.algorithm"
                  :items="shapingAlgorithms"
                  label="Shaping Algorithm"
                  :disabled="!trafficShaping.enabled"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="trafficShaping.bufferSize"
                  label="Buffer Size (KB)"
                  type="number"
                  :disabled="!trafficShaping.enabled"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Traffic Rules
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-plus" color="primary">
              Add Rule
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="ruleHeaders"
              :items="trafficRules"
              :search="search"
            >
              <template v-slot:item.type="{ item }">
                <v-chip
                  :color="getRuleTypeColor(item.type)"
                  small
                >
                  {{ item.type }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon size="small" class="mr-2">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon size="small">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

const bandwidthControl = ref({
  enabled: true,
  maxUpload: 100,
  maxDownload: 1000
})

const trafficShaping = ref({
  enabled: true,
  algorithm: 'HTB',
  bufferSize: 1024
})

const shapingAlgorithms = [
  { title: 'Hierarchical Token Bucket (HTB)', value: 'HTB' },
  { title: 'Token Bucket Filter (TBF)', value: 'TBF' },
  { title: 'Stochastic Fairness Queueing (SFQ)', value: 'SFQ' }
]

const ruleHeaders = [
  { title: 'Rule Name', key: 'name' },
  { title: 'Type', key: 'type' },
  { title: 'Source', key: 'source' },
  { title: 'Destination', key: 'destination' },
  { title: 'Protocol', key: 'protocol' },
  { title: 'Action', key: 'action' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const trafficRules = ref([
  {
    id: 1,
    name: 'Block P2P',
    type: 'Block',
    source: 'Any',
    destination: 'P2P Applications',
    protocol: 'Any',
    action: 'Drop'
  },
  {
    id: 2,
    name: 'Limit Streaming',
    type: 'Limit',
    source: 'Any',
    destination: 'Streaming Services',
    protocol: 'TCP',
    action: 'Rate Limit: 5Mbps'
  },
  {
    id: 3,
    name: 'Prioritize VoIP',
    type: 'Priority',
    source: 'VoIP Devices',
    destination: 'Any',
    protocol: 'UDP',
    action: 'High Priority'
  }
])

function getRuleTypeColor(type) {
  const colors = {
    'Block': 'error',
    'Limit': 'warning',
    'Priority': 'success',
    'default': 'grey'
  }
  return colors[type] || colors.default
}
</script>

<style scoped>
.v-card {
  height: 100%;
}

.v-chip {
  font-size: 12px;
}
</style> 