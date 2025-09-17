<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>IP Groups</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="ipGroups"
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

            <!-- IP Ranges -->
            <v-row>
              <v-col cols="12">
                <v-list>
                  <v-subheader>IP Ranges</v-subheader>
                  <v-list-item v-for="(range, index) in editedItem.ranges" :key="index">
                    <v-list-item-content>
                      <v-row align="center">
                        <v-col cols="4">
                          <v-text-field
                            v-model="range.start"
                            label="Start IP"
                            :rules="[ipRules.required, ipRules.valid]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="range.end"
                            label="End IP"
                            :rules="[ipRules.required, ipRules.valid]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="range.description"
                            label="Description"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="1">
                          <v-btn icon @click="removeRange(index)">
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
                  @click="addRange"
                  class="mt-2"
                >
                  Add IP Range
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
        <v-card-title class="text-h5">Are you sure you want to delete this IP group?</v-card-title>
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
import { ipGroups as initialIpGroups } from '@/data/dummyData'

const search = ref('')
const dialog = ref(false)
const dialogDelete = ref(false)
const ipGroups = ref(initialIpGroups)

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Range Count', key: 'ranges.length' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const defaultItem = {
  name: '',
  description: '',
  ranges: []
}

const editedIndex = ref(-1)
const editedItem = ref({ ...defaultItem })

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New IP Group' : 'Edit IP Group'
})

const ipRules = {
  required: v => !!v || 'IP is required',
  valid: v => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/
    return pattern.test(v) || 'Invalid IP format'
  }
}

function editItem(item) {
  editedIndex.value = ipGroups.value.indexOf(item)
  editedItem.value = JSON.parse(JSON.stringify(item))
  dialog.value = true
}

function deleteItem(item) {
  editedIndex.value = ipGroups.value.indexOf(item)
  editedItem.value = JSON.parse(JSON.stringify(item))
  dialogDelete.value = true
}

function deleteItemConfirm() {
  ipGroups.value.splice(editedIndex.value, 1)
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
    Object.assign(ipGroups.value[editedIndex.value], editedItem.value)
  } else {
    ipGroups.value.push(editedItem.value)
  }
  close()
}

function addRange() {
  editedItem.value.ranges.push({
    start: '',
    end: '',
    description: ''
  })
}

function removeRange(index) {
  editedItem.value.ranges.splice(index, 1)
}
</script>

<style scoped>
.v-data-table {
  width: 100%;
}
</style> 