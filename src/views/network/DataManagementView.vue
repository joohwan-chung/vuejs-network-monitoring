<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Network Data Management
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
                  <v-card-title>Storage Status</v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-database</v-icon>
                        </template>
                        <v-list-item-title>Total Space</v-list-item-title>
                        <v-list-item-subtitle>{{ stats.totalSpace }} GB</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="success">mdi-database-check</v-icon>
                        </template>
                        <v-list-item-title>Used Space</v-list-item-title>
                        <v-list-item-subtitle>{{ stats.usedSpace }} GB</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="warning">mdi-database-alert</v-icon>
                        </template>
                        <v-list-item-title>Available Space</v-list-item-title>
                        <v-list-item-subtitle>{{ stats.availableSpace }} GB</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                    <v-progress-linear
                      :model-value="usagePercentage"
                      color="primary"
                      height="20"
                      class="mt-4"
                    >
                      <template v-slot:default="{ value }">
                        <strong>{{ Math.ceil(value) }}% Used</strong>
                      </template>
                    </v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="8">
                <v-card>
                  <v-card-title>Data Retention Settings</v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="settings.retentionPeriod"
                            :items="retentionPeriods"
                            label="Data Retention Period"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="settings.cleanupSchedule"
                            :items="cleanupSchedules"
                            label="Cleanup Schedule"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-checkbox
                            v-model="settings.autoCleanup"
                            label="Enable Automatic Cleanup"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                      <v-btn
                        color="primary"
                        block
                        @click="saveSettings"
                        :disabled="!valid"
                      >
                        Save Settings
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-card class="mt-4">
                  <v-card-title>Backup Management</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-btn
                          color="primary"
                          block
                          @click="createBackup"
                          :loading="backupLoading"
                        >
                          Create Backup
                        </v-btn>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn
                          color="warning"
                          block
                          @click="restoreBackup"
                          :loading="restoreLoading"
                        >
                          Restore Backup
                        </v-btn>
                      </v-col>
                    </v-row>

                    <v-data-table
                      :headers="backupHeaders"
                      :items="backups"
                      :search="search"
                      class="mt-4"
                    >
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          icon
                          small
                          color="primary"
                          class="mr-2"
                          @click="downloadBackup(item)"
                        >
                          <v-icon>mdi-download</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          small
                          color="error"
                          @click="deleteBackup(item)"
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
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const valid = ref(true)
const backupLoading = ref(false)
const restoreLoading = ref(false)

const stats = ref({
  totalSpace: 1000,
  usedSpace: 450,
  availableSpace: 550
})

const settings = ref({
  retentionPeriod: '30 Days',
  cleanupSchedule: 'Daily',
  autoCleanup: true
})

const retentionPeriods = [
  '7 Days',
  '30 Days',
  '90 Days',
  '180 Days',
  '1 Year'
]

const cleanupSchedules = [
  'Daily',
  'Weekly',
  'Monthly'
]

const backupHeaders = [
  { title: 'Backup Date', key: 'date' },
  { title: 'Size', key: 'size' },
  { title: 'Type', key: 'type' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const backups = ref([
  {
    date: '2024-03-15 10:30:00',
    size: '2.5 GB',
    type: 'Full',
    status: 'Complete'
  },
  {
    date: '2024-03-14 10:30:00',
    size: '1.8 GB',
    type: 'Incremental',
    status: 'Complete'
  }
])

const usagePercentage = computed(() => {
  return (stats.value.usedSpace / stats.value.totalSpace) * 100
})

function saveSettings() {
  // TODO: Implement settings save logic
  console.log('Saving settings:', settings.value)
}

function createBackup() {
  // TODO: Implement backup creation logic
  backupLoading.value = true
  setTimeout(() => {
    backupLoading.value = false
    console.log('Creating backup')
  }, 2000)
}

function restoreBackup() {
  // TODO: Implement backup restoration logic
  restoreLoading.value = true
  setTimeout(() => {
    restoreLoading.value = false
    console.log('Restoring backup')
  }, 2000)
}

function downloadBackup(item) {
  // TODO: Implement backup download logic
  console.log('Downloading backup:', item)
}

function deleteBackup(item) {
  // TODO: Implement backup deletion logic
  console.log('Deleting backup:', item)
}
</script> 