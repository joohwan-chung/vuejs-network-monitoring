<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Application Groups</v-toolbar-title>
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
            <template v-slot:item.category="{ item }">
              <v-chip
                :color="getCategoryColor(item.category)"
                small
              >
                {{ item.category }}
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
  { title: 'Applications', key: 'applications' },
  { title: 'Category', key: 'category' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const groups = ref([
  {
    id: 1,
    name: 'Web Services',
    description: 'Common web applications',
    applications: 'HTTP, HTTPS, FTP',
    category: 'Web'
  },
  {
    id: 2,
    name: 'Messaging Apps',
    description: 'Instant messaging applications',
    applications: 'Slack, Teams, Discord',
    category: 'Communication'
  },
  {
    id: 3,
    name: 'Video Streaming',
    description: 'Video streaming services',
    applications: 'YouTube, Netflix, Prime',
    category: 'Streaming'
  },
  {
    id: 4,
    name: 'Database Services',
    description: 'Database related applications',
    applications: 'MySQL, PostgreSQL, MongoDB',
    category: 'Database'
  }
])

function getCategoryColor(category) {
  const colors = {
    'Web': 'primary',
    'Communication': 'success',
    'Streaming': 'warning',
    'Database': 'info',
    'default': 'grey'
  }
  return colors[category] || colors.default
}
</script>

<style scoped>
.v-chip {
  font-size: 12px;
}
</style> 