<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            User Management
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              density="compact"
            ></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Add New User</v-card-title>
                  <v-card-text>
                    <v-form v-model="valid" @submit.prevent="addUser">
                      <v-text-field
                        v-model="newUser.username"
                        label="Username"
                        :rules="[v => !!v || 'Username is required']"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newUser.password"
                        label="Password"
                        type="password"
                        :rules="[v => !!v || 'Password is required']"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newUser.confirmPassword"
                        label="Confirm Password"
                        type="password"
                        :rules="[
                          v => !!v || 'Password confirmation is required',
                          v => v === newUser.password || 'Passwords must match'
                        ]"
                        required
                      ></v-text-field>
                      <v-select
                        v-model="newUser.role"
                        :items="roles"
                        label="Role"
                        required
                      ></v-select>
                      <v-text-field
                        v-model="newUser.email"
                        label="Email"
                        type="email"
                        :rules="[v => !v || /.+@.+\..+/.test(v) || 'Email must be valid']"
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        block
                        type="submit"
                        :disabled="!valid"
                      >
                        Add User
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="8">
                <v-card>
                  <v-card-title>User List</v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="users"
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
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          icon
                          small
                          color="primary"
                          class="mr-2"
                          @click="editUser(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          small
                          :color="item.status === 'Active' ? 'warning' : 'success'"
                          class="mr-2"
                          @click="toggleUserStatus(item)"
                        >
                          <v-icon>{{ item.status === 'Active' ? 'mdi-lock' : 'mdi-lock-open' }}</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          small
                          color="error"
                          @click="deleteUser(item)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit User Dialog -->
    <v-dialog
      v-model="editDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          Edit User
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="editDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="editValid">
            <v-text-field
              v-model="editedUser.username"
              label="Username"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="editedUser.email"
              label="Email"
              type="email"
              :rules="[v => !v || /.+@.+\..+/.test(v) || 'Email must be valid']"
            ></v-text-field>
            <v-select
              v-model="editedUser.role"
              :items="roles"
              label="Role"
            ></v-select>
            <v-checkbox
              v-model="changePassword"
              label="Change Password"
            ></v-checkbox>
            <template v-if="changePassword">
              <v-text-field
                v-model="editedUser.newPassword"
                label="New Password"
                type="password"
                :rules="[v => !!v || 'Password is required']"
              ></v-text-field>
              <v-text-field
                v-model="editedUser.confirmNewPassword"
                label="Confirm New Password"
                type="password"
                :rules="[
                  v => !!v || 'Password confirmation is required',
                  v => v === editedUser.newPassword || 'Passwords must match'
                ]"
              ></v-text-field>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="saveUserEdit"
            :disabled="!editValid"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const valid = ref(true)
const editValid = ref(true)
const editDialog = ref(false)
const changePassword = ref(false)

const newUser = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  email: ''
})

const editedUser = ref({
  username: '',
  email: '',
  role: '',
  newPassword: '',
  confirmNewPassword: ''
})

const roles = [
  'Administrator',
  'Manager',
  'Operator',
  'Viewer'
]

const headers = [
  { title: 'Username', key: 'username' },
  { title: 'Role', key: 'role' },
  { title: 'Email', key: 'email' },
  { title: 'Last Login', key: 'lastLogin' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const users = ref([
  {
    username: 'admin',
    role: 'Administrator',
    email: 'admin@example.com',
    lastLogin: '2024-03-15 10:30:00',
    status: 'Active'
  },
  {
    username: 'manager1',
    role: 'Manager',
    email: 'manager1@example.com',
    lastLogin: '2024-03-14 15:45:00',
    status: 'Active'
  },
  {
    username: 'operator1',
    role: 'Operator',
    email: 'operator1@example.com',
    lastLogin: '2024-03-13 09:15:00',
    status: 'Inactive'
  }
])

function addUser() {
  // TODO: Implement add user logic
  console.log('Adding new user:', newUser.value)
}

function editUser(item) {
  editedUser.value = { ...item }
  changePassword.value = false
  editDialog.value = true
}

function saveUserEdit() {
  // TODO: Implement save edit logic
  console.log('Saving user edit:', editedUser.value)
  editDialog.value = false
}

function toggleUserStatus(item) {
  // TODO: Implement status toggle logic
  console.log('Toggling user status:', item)
}

function deleteUser(item) {
  // TODO: Implement delete logic
  console.log('Deleting user:', item)
}
</script> 