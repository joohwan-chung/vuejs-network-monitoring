<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>System Settings</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="settings.hostname"
                label="Hostname"
                required
              ></v-text-field>
              <v-text-field
                v-model="settings.timezone"
                label="Timezone"
                required
              ></v-text-field>
              <v-select
                v-model="settings.language"
                :items="languages"
                label="Language"
                required
              ></v-select>
              <v-btn
                color="primary"
                block
                @click="saveSystemSettings"
                :disabled="!valid"
              >
                Save System Settings
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Network Settings</v-card-title>
          <v-card-text>
            <v-form v-model="networkValid">
              <v-text-field
                v-model="network.ipAddress"
                label="IP Address"
                required
              ></v-text-field>
              <v-text-field
                v-model="network.subnet"
                label="Subnet Mask"
                required
              ></v-text-field>
              <v-text-field
                v-model="network.gateway"
                label="Gateway"
                required
              ></v-text-field>
              <v-text-field
                v-model="network.dns1"
                label="Primary DNS"
                required
              ></v-text-field>
              <v-text-field
                v-model="network.dns2"
                label="Secondary DNS"
              ></v-text-field>
              <v-btn
                color="primary"
                block
                @click="saveNetworkSettings"
                :disabled="!networkValid"
              >
                Save Network Settings
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Email Settings</v-card-title>
          <v-card-text>
            <v-form v-model="emailValid">
              <v-text-field
                v-model="email.server"
                label="SMTP Server"
                required
              ></v-text-field>
              <v-text-field
                v-model="email.port"
                label="SMTP Port"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="email.username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="email.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-checkbox
                v-model="email.ssl"
                label="Use SSL/TLS"
              ></v-checkbox>
              <v-btn
                color="primary"
                block
                @click="saveEmailSettings"
                :disabled="!emailValid"
              >
                Save Email Settings
              </v-btn>
              <v-btn
                color="secondary"
                block
                class="mt-2"
                @click="testEmailSettings"
              >
                Test Email Settings
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Maintenance</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-btn
                  color="warning"
                  block
                  @click="restartSystem"
                  :loading="restartLoading"
                >
                  Restart System
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="error"
                  block
                  @click="factoryReset"
                  :loading="resetLoading"
                >
                  Factory Reset
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const valid = ref(true)
const networkValid = ref(true)
const emailValid = ref(true)
const restartLoading = ref(false)
const resetLoading = ref(false)

const settings = ref({
  hostname: 'taskqos-server',
  timezone: 'Asia/Seoul',
  language: 'English'
})

const languages = [
  'English',
  'Korean',
  'Japanese',
  'Chinese'
]

const network = ref({
  ipAddress: '192.168.1.100',
  subnet: '255.255.255.0',
  gateway: '192.168.1.1',
  dns1: '8.8.8.8',
  dns2: '8.8.4.4'
})

const email = ref({
  server: 'smtp.example.com',
  port: 587,
  username: 'admin@example.com',
  password: '',
  ssl: true
})

function saveSystemSettings() {
  // TODO: Implement system settings save logic
  console.log('Saving system settings:', settings.value)
}

function saveNetworkSettings() {
  // TODO: Implement network settings save logic
  console.log('Saving network settings:', network.value)
}

function saveEmailSettings() {
  // TODO: Implement email settings save logic
  console.log('Saving email settings:', email.value)
}

function testEmailSettings() {
  // TODO: Implement email test logic
  console.log('Testing email settings')
}

function restartSystem() {
  // TODO: Implement system restart logic
  restartLoading.value = true
  setTimeout(() => {
    restartLoading.value = false
    console.log('Restarting system')
  }, 2000)
}

function factoryReset() {
  // TODO: Implement factory reset logic
  resetLoading.value = true
  setTimeout(() => {
    resetLoading.value = false
    console.log('Factory reset')
  }, 2000)
}
</script> 