<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Block Management</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Blocked IPs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="mr-4"
            ></v-text-field>
            <v-btn icon @click="addBlockedIP">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="blockedIPs"
            :search="search"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status === 'Active' ? 'error' : 'grey'"
                small
              >
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon size="small" @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deleteItem(item)">
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
  { title: 'IP Address', key: 'ip' },
  { title: 'Reason', key: 'reason' },
  { title: 'Added Date', key: 'date' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const blockedIPs = ref([
  {
    ip: '192.168.1.100',
    reason: 'Suspicious Activity',
    date: '2024-03-20',
    status: 'Active'
  },
  {
    ip: '10.0.0.50',
    reason: 'Multiple Failed Attempts',
    date: '2024-03-19',
    status: 'Active'
  },
  {
    ip: '172.16.0.25',
    reason: 'Policy Violation',
    date: '2024-03-18',
    status: 'Inactive'
  }
])

function addBlockedIP() {
  // TODO: Implement add functionality
  console.log('Add new blocked IP')
}

function editItem(item) {
  // TODO: Implement edit functionality
  console.log('Edit item:', item)
}

function deleteItem(item) {
  // TODO: Implement delete functionality
  console.log('Delete item:', item)
}
</script> 