<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>QoS Filters</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-plus">
              Add Filter
            </v-btn>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="filters"
            :search="search"
          >
            <template v-slot:item.priority="{ item }">
              <v-chip
                :color="getPriorityColor(item.priority)"
                small
              >
                {{ item.priority }}
              </v-chip>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status === 'Active' ? 'success' : 'error'"
                small
              >
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon size="small" class="mr-2">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn icon size="small" class="mr-2">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn icon size="small" class="mr-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'Filter Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Match Condition', key: 'condition' },
  { title: 'Priority', key: 'priority' },
  { title: 'Bandwidth', key: 'bandwidth' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const filters = ref([
  {
    id: 1,
    name: 'VoIP Traffic',
    description: 'Voice over IP applications',
    condition: 'Port: 5060-5061, Protocol: UDP/TCP',
    priority: 'High',
    bandwidth: '10 Mbps',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Backup Traffic',
    description: 'Backup service traffic',
    condition: 'IP Group: Backup Servers',
    priority: 'Low',
    bandwidth: '50 Mbps',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Video Streaming',
    description: 'Streaming services',
    condition: 'Application Group: Streaming',
    priority: 'Medium',
    bandwidth: '20 Mbps',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Guest Network',
    description: 'Guest WiFi traffic',
    condition: 'VLAN: 100',
    priority: 'Low',
    bandwidth: '5 Mbps',
    status: 'Inactive'
  }
])

function getPriorityColor(priority) {
  const colors = {
    'High': 'error',
    'Medium': 'warning',
    'Low': 'success',
    'default': 'grey'
  }
  return colors[priority] || colors.default
}
</script>

<style scoped>
.v-chip {
  font-size: 12px;
}

.v-btn {
  margin-right: 4px;
}
</style> 