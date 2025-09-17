<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Network Bypass Settings
            <v-spacer></v-spacer>
            <v-switch
              v-model="bypassEnabled"
              label="Enable Bypass"
              color="primary"
              hide-details
              density="compact"
            ></v-switch>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>IP Bypass List</v-card-title>
                  <v-card-text>
                    <v-form v-model="valid" @submit.prevent="addBypassIP">
                      <v-text-field
                        v-model="newBypass.ip"
                        label="IP Address/Range"
                        :rules="[v => !!v || 'IP is required']"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newBypass.description"
                        label="Description"
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        block
                        type="submit"
                        :disabled="!valid"
                      >
                        Add IP
                      </v-btn>
                    </v-form>

                    <v-data-table
                      :headers="ipHeaders"
                      :items="bypassIPs"
                      :search="search"
                      class="mt-4"
                    >
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          icon
                          small
                          color="error"
                          @click="removeIP(item)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>MAC Bypass List</v-card-title>
                  <v-card-text>
                    <v-form v-model="validMAC" @submit.prevent="addBypassMAC">
                      <v-text-field
                        v-model="newBypass.mac"
                        label="MAC Address"
                        :rules="[v => !!v || 'MAC is required']"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newBypass.description"
                        label="Description"
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        block
                        type="submit"
                        :disabled="!validMAC"
                      >
                        Add MAC
                      </v-btn>
                    </v-form>

                    <v-data-table
                      :headers="macHeaders"
                      :items="bypassMACs"
                      :search="search"
                      class="mt-4"
                    >
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          icon
                          small
                          color="error"
                          @click="removeMAC(item)"
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
import { ref } from 'vue'

const bypassEnabled = ref(false)
const valid = ref(true)
const validMAC = ref(true)
const search = ref('')

const newBypass = ref({
  ip: '',
  mac: '',
  description: ''
})

const ipHeaders = [
  { title: 'IP Address/Range', key: 'ip' },
  { title: 'Description', key: 'description' },
  { title: 'Added Date', key: 'addedDate' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const macHeaders = [
  { title: 'MAC Address', key: 'mac' },
  { title: 'Description', key: 'description' },
  { title: 'Added Date', key: 'addedDate' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const bypassIPs = ref([
  {
    ip: '192.168.1.0/24',
    description: 'Local Network',
    addedDate: '2024-03-15'
  },
  {
    ip: '10.0.0.1',
    description: 'Gateway',
    addedDate: '2024-03-14'
  }
])

const bypassMACs = ref([
  {
    mac: '00:11:22:33:44:55',
    description: 'Server 1',
    addedDate: '2024-03-15'
  },
  {
    mac: 'AA:BB:CC:DD:EE:FF',
    description: 'Admin PC',
    addedDate: '2024-03-14'
  }
])

function addBypassIP() {
  // TODO: Implement add IP logic
  console.log('Adding bypass IP:', newBypass.value)
}

function addBypassMAC() {
  // TODO: Implement add MAC logic
  console.log('Adding bypass MAC:', newBypass.value)
}

function removeIP(item) {
  // TODO: Implement remove IP logic
  console.log('Removing IP:', item)
}

function removeMAC(item) {
  // TODO: Implement remove MAC logic
  console.log('Removing MAC:', item)
}
</script> 