<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>MAC Address Groups</v-toolbar-title>
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
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status === 'Active' ? 'success' : 'error'"
                small
              >
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.vendor="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ props }">
                  <span v-bind="props">{{ item.vendor }}</span>
                </template>
                <span>{{ item.vendorInfo }}</span>
              </v-tooltip>
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
  { title: 'MAC Addresses', key: 'macAddresses' },
  { title: 'Vendor', key: 'vendor' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const groups = ref([
  {
    id: 1,
    name: 'Office Printers',
    description: 'Network printers in office',
    macAddresses: '00:11:22:33:44:55, 00:11:22:33:44:56',
    vendor: 'HP',
    vendorInfo: 'Hewlett-Packard Company',
    status: 'Active'
  },
  {
    id: 2,
    name: 'IP Phones',
    description: 'VoIP phones',
    macAddresses: '11:22:33:44:55:66, 11:22:33:44:55:67',
    vendor: 'Cisco',
    vendorInfo: 'Cisco Systems, Inc',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Security Cameras',
    description: 'CCTV cameras',
    macAddresses: '22:33:44:55:66:77, 22:33:44:55:66:78',
    vendor: 'Axis',
    vendorInfo: 'Axis Communications AB',
    status: 'Inactive'
  }
])
</script>

<style scoped>
.v-chip {
  font-size: 12px;
}

.v-tooltip {
  cursor: pointer;
}
</style> 