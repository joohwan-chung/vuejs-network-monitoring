<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">System Settings</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-tabs v-model="activeTab">
            <v-tab value="general">General</v-tab>
            <v-tab value="network">Network</v-tab>
            <v-tab value="security">Security</v-tab>
            <v-tab value="backup">Backup</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="activeTab">
              <v-window-item value="general">
                <v-form>
                  <v-text-field
                    v-model="settings.systemName"
                    label="System Name"
                  ></v-text-field>
                  <v-select
                    v-model="settings.timezone"
                    :items="timezones"
                    label="Timezone"
                  ></v-select>
                  <v-switch
                    v-model="settings.notifications"
                    label="Enable Notifications"
                  ></v-switch>
                </v-form>
              </v-window-item>

              <v-window-item value="network">
                <v-form>
                  <v-text-field
                    v-model="settings.ipAddress"
                    label="IP Address"
                  ></v-text-field>
                  <v-text-field
                    v-model="settings.subnet"
                    label="Subnet Mask"
                  ></v-text-field>
                  <v-text-field
                    v-model="settings.gateway"
                    label="Default Gateway"
                  ></v-text-field>
                </v-form>
              </v-window-item>

              <v-window-item value="security">
                <v-form>
                  <v-text-field
                    v-model="settings.sessionTimeout"
                    label="Session Timeout (minutes)"
                    type="number"
                  ></v-text-field>
                  <v-switch
                    v-model="settings.twoFactor"
                    label="Two-Factor Authentication"
                  ></v-switch>
                </v-form>
              </v-window-item>

              <v-window-item value="backup">
                <v-form>
                  <v-text-field
                    v-model="settings.backupLocation"
                    label="Backup Location"
                  ></v-text-field>
                  <v-select
                    v-model="settings.backupSchedule"
                    :items="backupSchedules"
                    label="Backup Schedule"
                  ></v-select>
                </v-form>
              </v-window-item>
            </v-window>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveSettings">
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>System Information</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Version</v-list-item-title>
                <template v-slot:append>1.0.0</template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Last Updated</v-list-item-title>
                <template v-slot:append>2024-03-20</template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>System Status</v-list-item-title>
                <template v-slot:append>
                  <v-chip color="success" small>Running</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')

const timezones = [
  'UTC',
  'Asia/Seoul',
  'America/New_York',
  'Europe/London'
]

const backupSchedules = [
  'Daily',
  'Weekly',
  'Monthly'
]

const settings = ref({
  systemName: 'Network Management System',
  timezone: 'Asia/Seoul',
  notifications: true,
  ipAddress: '192.168.1.1',
  subnet: '255.255.255.0',
  gateway: '192.168.1.254',
  sessionTimeout: 30,
  twoFactor: false,
  backupLocation: '/backup',
  backupSchedule: 'Daily'
})

function saveSettings() {
  // TODO: Implement settings save functionality
  console.log('Save settings:', settings.value)
}
</script> 