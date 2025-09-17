<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Administrator</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>User Management</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="mr-4"
            ></v-text-field>
            <v-btn icon @click="addUser">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
          >
            <template v-slot:item.role="{ item }">
              <v-chip
                :color="getRoleColor(item.role)"
                small
              >
                {{ item.role }}
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
              <v-btn icon size="small" @click="editUser(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deleteUser(item)">
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
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Last Login', key: 'lastLogin' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const users = ref([
  {
    username: 'admin',
    email: 'admin@example.com',
    role: 'Administrator',
    lastLogin: '2024-03-20 10:30',
    status: 'Active'
  },
  {
    username: 'operator',
    email: 'operator@example.com',
    role: 'Operator',
    lastLogin: '2024-03-19 15:45',
    status: 'Active'
  },
  {
    username: 'viewer',
    email: 'viewer@example.com',
    role: 'Viewer',
    lastLogin: '2024-03-18 09:15',
    status: 'Inactive'
  }
])

function getRoleColor(role) {
  switch (role) {
    case 'Administrator':
      return 'purple'
    case 'Operator':
      return 'blue'
    case 'Viewer':
      return 'green'
    default:
      return 'grey'
  }
}

function addUser() {
  // TODO: Implement add functionality
  console.log('Add new user')
}

function editUser(user) {
  // TODO: Implement edit functionality
  console.log('Edit user:', user)
}

function deleteUser(user) {
  // TODO: Implement delete functionality
  console.log('Delete user:', user)
}
</script> 