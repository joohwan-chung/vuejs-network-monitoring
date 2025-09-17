<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Filters</v-toolbar-title>
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
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="filter in filters" :key="filter.id">
            <td>{{ filter.name }}</td>
            <td>{{ filter.description }}</td>
            <td>{{ filter.type }}</td>
            <td>
              <v-btn icon size="small" @click="editItem(filter)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deleteItem(filter)">
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
const filters = ref([
  {
    id: 1,
    name: 'HTTP Filter',
    description: 'Filter for HTTP traffic',
    type: 'Protocol'
  },
  {
    id: 2,
    name: 'Social Media',
    description: 'Filter for social media sites',
    type: 'Application'
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