<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>QoS Classes</v-toolbar-title>
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
            <th>Priority</th>
            <th>Bandwidth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="qos in qosClasses" :key="qos.id">
            <td>{{ qos.name }}</td>
            <td>{{ qos.priority }}</td>
            <td>{{ qos.bandwidth }}</td>
            <td>
              <v-btn icon size="small" @click="editItem(qos)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deleteItem(qos)">
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
const qosClasses = ref([
  {
    id: 1,
    name: 'High Priority',
    priority: 1,
    bandwidth: '1 Gbps'
  },
  {
    id: 2,
    name: 'Normal',
    priority: 2,
    bandwidth: '500 Mbps'
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