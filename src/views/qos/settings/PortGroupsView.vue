<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Port Groups</v-toolbar-title>
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
  { title: 'Port Range', key: 'portRange' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const groups = ref([
  {
    id: 1,
    name: 'HTTP Ports',
    description: 'Standard web ports',
    portRange: '80, 443'
  },
  {
    id: 2,
    name: 'FTP Ports',
    description: 'File transfer ports',
    portRange: '20, 21'
  }
])
</script> 