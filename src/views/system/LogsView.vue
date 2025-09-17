<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            System Logs
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
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedLogType"
                  :items="logTypes"
                  label="Log Type"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedSeverity"
                  :items="severityLevels"
                  label="Severity"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="dateRange.start"
                  label="Start Date"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="dateRange.end"
                  label="End Date"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="logs"
              :search="search"
            >
              <template v-slot:item.severity="{ item }">
                <v-chip
                  :color="getSeverityColor(item.severity)"
                  small
                >
                  {{ item.severity }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  small
                  color="primary"
                  @click="viewLogDetails(item)"
                >
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <v-row class="mt-4">
              <v-col cols="12" md="4">
                <v-btn
                  color="primary"
                  block
                  @click="exportLogs"
                >
                  Export Logs
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  color="warning"
                  block
                  @click="clearLogs"
                >
                  Clear Logs
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  color="success"
                  block
                  @click="refreshLogs"
                >
                  Refresh
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Log Details Dialog -->
    <v-dialog
      v-model="detailsDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          Log Details
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="detailsDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-title>Timestamp</v-list-item-title>
              <v-list-item-subtitle>{{ selectedLog?.timestamp }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Type</v-list-item-title>
              <v-list-item-subtitle>{{ selectedLog?.type }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Severity</v-list-item-title>
              <v-list-item-subtitle>{{ selectedLog?.severity }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Source</v-list-item-title>
              <v-list-item-subtitle>{{ selectedLog?.source }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Message</v-list-item-title>
              <v-list-item-subtitle>{{ selectedLog?.message }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const selectedLogType = ref('All')
const selectedSeverity = ref('All')
const detailsDialog = ref(false)
const selectedLog = ref(null)

const dateRange = ref({
  start: '',
  end: ''
})

const logTypes = [
  'All',
  'System',
  'Security',
  'Application',
  'Network',
  'QoS'
]

const severityLevels = [
  'All',
  'Emergency',
  'Alert',
  'Critical',
  'Error',
  'Warning',
  'Notice',
  'Info',
  'Debug'
]

const headers = [
  { title: 'Timestamp', key: 'timestamp' },
  { title: 'Type', key: 'type' },
  { title: 'Severity', key: 'severity' },
  { title: 'Source', key: 'source' },
  { title: 'Message', key: 'message' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const logs = ref([
  {
    timestamp: '2024-03-15 10:30:25',
    type: 'System',
    severity: 'Error',
    source: 'QoS Engine',
    message: 'Failed to apply QoS policy'
  },
  {
    timestamp: '2024-03-15 10:29:15',
    type: 'Security',
    severity: 'Warning',
    source: 'Firewall',
    message: 'Suspicious traffic detected'
  },
  {
    timestamp: '2024-03-15 10:28:00',
    type: 'Network',
    severity: 'Info',
    source: 'DHCP Server',
    message: 'IP address assigned'
  }
])

function getSeverityColor(severity) {
  const colors = {
    Emergency: 'deep-purple',
    Alert: 'purple',
    Critical: 'red-darken-4',
    Error: 'error',
    Warning: 'warning',
    Notice: 'info',
    Info: 'success',
    Debug: 'grey'
  }
  return colors[severity] || 'grey'
}

function viewLogDetails(item) {
  selectedLog.value = item
  detailsDialog.value = true
}

function exportLogs() {
  // TODO: Implement log export logic
  console.log('Exporting logs')
}

function clearLogs() {
  // TODO: Implement log clear logic
  console.log('Clearing logs')
}

function refreshLogs() {
  // TODO: Implement log refresh logic
  console.log('Refreshing logs')
}
</script> 