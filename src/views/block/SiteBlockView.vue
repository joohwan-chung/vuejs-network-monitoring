<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Site Block Management
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
                  <v-card-title>Add New Block</v-card-title>
                  <v-card-text>
                    <v-form v-model="valid" @submit.prevent="addBlockedSite">
                      <v-text-field
                        v-model="newSite.domain"
                        label="Domain/URL"
                        :rules="[v => !!v || 'Domain is required']"
                        required
                      ></v-text-field>
                      <v-select
                        v-model="newSite.category"
                        :items="categories"
                        label="Category"
                        required
                      ></v-select>
                      <v-textarea
                        v-model="newSite.reason"
                        label="Blocking Reason"
                        rows="3"
                      ></v-textarea>
                      <v-btn
                        color="primary"
                        block
                        type="submit"
                        :disabled="!valid"
                      >
                        Add Block
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="8">
                <v-card>
                  <v-card-title>Blocked Sites</v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="blockedSites"
                      :search="search"
                    >
                      <template v-slot:item.status="{ item }">
                        <v-chip
                          :color="item.status === 'Active' ? 'error' : 'warning'"
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
                          @click="editSite(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          small
                          color="error"
                          @click="removeSite(item)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12">
                <v-card>
                  <v-card-title>Block Statistics</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-card>
                          <v-card-text class="text-center">
                            <div class="text-h4 mb-2">{{ stats.totalBlocked }}</div>
                            <div class="text-caption">Total Blocked Sites</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-card>
                          <v-card-text class="text-center">
                            <div class="text-h4 mb-2">{{ stats.activeBlocks }}</div>
                            <div class="text-caption">Active Blocks</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-card>
                          <v-card-text class="text-center">
                            <div class="text-h4 mb-2">{{ stats.blockedAttempts }}</div>
                            <div class="text-caption">Blocked Attempts Today</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-card>
                          <v-card-text class="text-center">
                            <div class="text-h4 mb-2">{{ stats.lastUpdated }}</div>
                            <div class="text-caption">Last Updated</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
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

const search = ref('')
const valid = ref(true)

const newSite = ref({
  domain: '',
  category: '',
  reason: ''
})

const categories = [
  'Malware',
  'Phishing',
  'Adult Content',
  'Gambling',
  'Social Media',
  'Gaming',
  'Streaming',
  'Other'
]

const headers = [
  { title: 'Domain/URL', key: 'domain' },
  { title: 'Category', key: 'category' },
  { title: 'Added Date', key: 'addedDate' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const blockedSites = ref([
  {
    domain: 'example-malware.com',
    category: 'Malware',
    addedDate: '2024-03-15',
    status: 'Active'
  },
  {
    domain: 'phishing-site.net',
    category: 'Phishing',
    addedDate: '2024-03-14',
    status: 'Active'
  },
  {
    domain: 'gaming-site.com',
    category: 'Gaming',
    addedDate: '2024-03-13',
    status: 'Inactive'
  }
])

const stats = ref({
  totalBlocked: 156,
  activeBlocks: 142,
  blockedAttempts: 1247,
  lastUpdated: '15:30:45'
})

function addBlockedSite() {
  // TODO: Implement add site logic
  console.log('Adding new site:', newSite.value)
}

function editSite(item) {
  // TODO: Implement edit logic
  console.log('Editing site:', item)
}

function removeSite(item) {
  // TODO: Implement remove logic
  console.log('Removing site:', item)
}
</script>

<style scoped>
.v-card-title {
  padding: 16px;
}

.v-card-text {
  padding: 16px;
}

.text-h4 {
  font-weight: bold;
  color: var(--v-primary-base);
}
</style> 