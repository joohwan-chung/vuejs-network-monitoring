<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Port Groups</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-icon="mdi-magnify"
        single-line
        hide-details
        class="mb-4"
      ></v-text-field>

      <v-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Port Range</th>
            <th>Protocol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="port in portGroups" :key="port.id">
            <td>{{ port.name }}</td>
            <td>{{ port.portRange }}</td>
            <td>{{ port.protocol }}</td>
            <td>
              <v-btn icon size="small" @click="editItem(port)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deleteItem(port)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const dialog = ref(false)
const portGroups = ref([
  {
    id: 1,
    name: 'HTTP Ports',
    portRange: '80, 443',
    protocol: 'TCP'
  },
  {
    id: 2,
    name: 'FTP Ports',
    portRange: '20-21',
    protocol: 'TCP'
  }
])

function editItem(item) {
  // TODO: Implement edit functionality
  console.log('Edit item:', item)
}

function deleteItem(item) {
  // TODO: Implement delete functionality
  console.log('Delete item:', item)
}
</script> 