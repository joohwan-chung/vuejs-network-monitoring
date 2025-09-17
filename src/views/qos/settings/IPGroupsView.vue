<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>IP Groups</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-plus">
              Add Group
            </v-btn>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="groups"
            :search="search"
          >
            <template v-slot:item.type="{ item }">
              <v-chip
                :color="item.type === 'IPv4' ? 'primary' : 'secondary'"
                small
              >
                {{ item.type }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon size="small">
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
  { title: 'Group Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'IP Range/CIDR', key: 'ipRange' },
  { title: 'Type', key: 'type' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const groups = ref([
  {
    id: 1,
    name: 'Internal Network',
    description: 'Internal office network',
    ipRange: '192.168.1.0/24',
    type: 'IPv4'
  },
  {
    id: 2,
    name: 'VPN Network',
    description: 'VPN user network range',
    ipRange: '10.8.0.0/16',
    type: 'IPv4'
  },
  {
    id: 3,
    name: 'External Services',
    description: 'External service IPs',
    ipRange: '2001:db8::/32',
    type: 'IPv6'
  }
])
</script>

<style scoped>
.v-chip {
  font-size: 12px;
}
</style> 