<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Application Groups</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="applicationGroups"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-icon="mdi-magnify"
          class="mx-4 mt-4"
          single-line
          hide-details
        ></v-text-field>
      </template>

      <template v-slot:item.risk="{ item }">
        <v-chip
          :color="getRiskColor(item.applications[0]?.risk)"
          small
        >
          {{ item.applications[0]?.risk }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="Group Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.description"
                  label="Description"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Applications List -->
            <v-row>
              <v-col cols="12">
                <v-list>
                  <v-subheader>Applications</v-subheader>
                  <v-list-item v-for="(app, index) in editedItem.applications" :key="index">
                    <v-list-item-content>
                      <v-row align="center">
                        <v-col cols="3">
                          <v-text-field
                            v-model="app.name"
                            label="Name"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="5">
                          <v-combobox
                            v-model="app.signatures"
                            label="Signatures"
                            multiple
                            chips
                            small-chips
                            deletable-chips
                          ></v-combobox>
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="app.risk"
                            :items="riskLevels"
                            label="Risk Level"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="1">
                          <v-btn icon @click="removeApplication(index)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn
                  color="primary"
                  text
                  @click="addApplication"
                  class="mt-2"
                >
                  Add Application
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this application group?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="primary" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { applicationGroups as initialApplicationGroups } from '@/data/dummyData'

const search = ref('')
const dialog = ref(false)
const dialogDelete = ref(false)
const applicationGroups = ref(initialApplicationGroups)

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'App Count', key: 'applications.length' },
  { title: 'Risk Level', key: 'risk' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const defaultItem = {
  name: '',
  description: '',
  applications: []
}

const editedIndex = ref(-1)
const editedItem = ref({ ...defaultItem })

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Application Group' : 'Edit Application Group'
})

function getRiskColor(risk) {
  switch (risk) {
    case 'LOW': return 'success'
    case 'MEDIUM': return 'warning'
    case 'HIGH': return 'orange'
    case 'CRITICAL': return 'error'
    default: return 'grey'
  }
}

function editItem(item) {
  editedIndex.value = applicationGroups.value.indexOf(item)
  editedItem.value = JSON.parse(JSON.stringify(item))
  dialog.value = true
}

function deleteItem(item) {
  editedIndex.value = applicationGroups.value.indexOf(item)
  editedItem.value = JSON.parse(JSON.stringify(item))
  dialogDelete.value = true
}

function deleteItemConfirm() {
  applicationGroups.value.splice(editedIndex.value, 1)
  closeDelete()
}

function close() {
  dialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
}

function closeDelete() {
  dialogDelete.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(applicationGroups.value[editedIndex.value], editedItem.value)
  } else {
    applicationGroups.value.push(editedItem.value)
  }
  close()
}

function addApplication() {
  editedItem.value.applications.push({
    name: '',
    signatures: [],
    risk: 'LOW'
  })
}

function removeApplication(index) {
  editedItem.value.applications.splice(index, 1)
}
</script>

<style scoped>
.v-data-table {
  width: 100%;
}
</style> 