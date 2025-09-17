<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Site Groups</v-toolbar-title>
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
                :color="getTypeColor(item.type)"
                small
              >
                {{ item.type }}
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
  { title: 'Sites/URLs', key: 'sites' },
  { title: 'Type', key: 'type' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const groups = ref([
  {
    id: 1,
    name: 'Social Media',
    description: 'Social networking sites',
    sites: 'facebook.com, twitter.com, instagram.com',
    type: 'SNS',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Video Platforms',
    description: 'Video streaming platforms',
    sites: 'youtube.com, netflix.com, primevideo.com',
    type: 'Streaming',
    status: 'Active'
  },
  {
    id: 3,
    name: 'News Sites',
    description: 'News and media websites',
    sites: 'news.com, bbc.com, cnn.com',
    type: 'News',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Gaming Sites',
    description: 'Online gaming platforms',
    sites: 'steam.com, epicgames.com, origin.com',
    type: 'Gaming',
    status: 'Inactive'
  }
])

function getTypeColor(type) {
  const colors = {
    'SNS': 'blue',
    'Streaming': 'purple',
    'News': 'orange',
    'Gaming': 'green',
    'default': 'grey'
  }
  return colors[type] || colors.default
}
</script>

<style scoped>
.v-chip {
  font-size: 12px;
}
</style> 