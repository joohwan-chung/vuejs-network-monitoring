<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">QoS Policy</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>QoS Policies</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-plus" @click="showSchedulerDialog = true">
              Add Policy
            </v-btn>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="policies"
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
              <v-btn icon size="small" @click="editPolicy(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deletePolicy(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Scheduler Dialog -->
    <v-dialog v-model="showSchedulerDialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editMode ? 'Edit Policy' : 'Add New Policy' }}</span>
        </v-card-title>

        <v-card-text>
          <v-stepper v-model="currentStep" class="elevation-0">
            <!-- Steps -->
            <v-stepper-header>
              <v-stepper-item value="1">
                Basic Info
              </v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item value="2">
                Target Selection
              </v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item value="3">
                Schedule
              </v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item value="4">
                QoS Settings
              </v-stepper-item>
            </v-stepper-header>

            <!-- Content -->
            <v-stepper-window>
              <!-- Step 1: Basic Info -->
              <v-stepper-window-item value="1">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="policyForm.name"
                        label="Policy Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="policyForm.description"
                        label="Description"
                        rows="3"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-window-item>

              <!-- Step 2: Target Selection -->
              <v-stepper-window-item value="2">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="policyForm.targetType"
                        :items="targetTypes"
                        label="Target Type"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="policyForm.targetGroup"
                        :items="getTargetGroups"
                        label="Target Group"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-window-item>

              <!-- Step 3: Schedule -->
              <v-stepper-window-item value="3">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="policyForm.scheduleType"
                        :items="scheduleTypes"
                        label="Schedule Type"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" v-if="policyForm.scheduleType === 'recurring'">
                      <v-select
                        v-model="policyForm.recurringDays"
                        :items="weekDays"
                        label="Days"
                        multiple
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="policyForm.startTime"
                        label="Start Time"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="policyForm.endTime"
                        label="End Time"
                        type="time"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-window-item>

              <!-- Step 4: QoS Settings -->
              <v-stepper-window-item value="4">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="policyForm.bandwidth"
                        label="Bandwidth (Mbps)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="policyForm.priority"
                        :items="priorities"
                        label="Priority"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-switch
                        v-model="policyForm.enableQueueing"
                        label="Enable Queueing"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            v-if="currentStep !== '1'"
            text
            @click="currentStep = String(Number(currentStep) - 1)"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="currentStep !== '4'"
            color="primary"
            @click="currentStep = String(Number(currentStep) + 1)"
          >
            Next
          </v-btn>
          <v-btn
            v-else
            color="primary"
            @click="savePolicy"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const showSchedulerDialog = ref(false)
const currentStep = ref('1')
const editMode = ref(false)
const search = ref('')

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Target', key: 'target' },
  { title: 'Schedule', key: 'schedule' },
  { title: 'Bandwidth', key: 'bandwidth' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const policies = ref([
  {
    id: 1,
    name: 'Work Hours Policy',
    target: 'IP Group: Office Network',
    schedule: 'Mon-Fri, 9:00-17:00',
    bandwidth: '100 Mbps',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Night Backup',
    target: 'Application: Backup Service',
    schedule: 'Daily, 00:00-04:00',
    bandwidth: '500 Mbps',
    status: 'Active'
  }
])

const targetTypes = [
  { title: 'IP Group', value: 'ip' },
  { title: 'Port Group', value: 'port' },
  { title: 'Application Group', value: 'app' },
  { title: 'MAC Group', value: 'mac' },
  { title: 'Site Group', value: 'site' }
]

const scheduleTypes = [
  { title: 'One Time', value: 'onetime' },
  { title: 'Recurring', value: 'recurring' }
]

const weekDays = [
  { title: 'Monday', value: 'MON' },
  { title: 'Tuesday', value: 'TUE' },
  { title: 'Wednesday', value: 'WED' },
  { title: 'Thursday', value: 'THU' },
  { title: 'Friday', value: 'FRI' },
  { title: 'Saturday', value: 'SAT' },
  { title: 'Sunday', value: 'SUN' }
]

const priorities = [
  { title: 'High', value: 1 },
  { title: 'Medium', value: 2 },
  { title: 'Low', value: 3 }
]

const policyForm = ref({
  name: '',
  description: '',
  targetType: '',
  targetGroup: '',
  scheduleType: 'recurring',
  recurringDays: [],
  startTime: '',
  endTime: '',
  bandwidth: '',
  priority: 2,
  enableQueueing: false
})

const getTargetGroups = computed(() => {
  // TODO: Implement dynamic target groups based on targetType
  return [
    { title: 'Group 1', value: 'group1' },
    { title: 'Group 2', value: 'group2' }
  ]
})

function editPolicy(policy) {
  editMode.value = true
  // TODO: Load policy data into form
  showSchedulerDialog.value = true
}

function deletePolicy(policy) {
  // TODO: Implement delete confirmation
  const index = policies.value.findIndex(p => p.id === policy.id)
  if (index !== -1) {
    policies.value.splice(index, 1)
  }
}

function savePolicy() {
  // TODO: Implement policy saving logic
  if (editMode.value) {
    // Update existing policy
  } else {
    // Add new policy
    policies.value.push({
      id: Date.now(),
      name: policyForm.value.name,
      target: `${policyForm.value.targetType}: ${policyForm.value.targetGroup}`,
      schedule: policyForm.value.scheduleType === 'recurring'
        ? `${policyForm.value.recurringDays.join(',')}, ${policyForm.value.startTime}-${policyForm.value.endTime}`
        : `${policyForm.value.startTime}-${policyForm.value.endTime}`,
      bandwidth: `${policyForm.value.bandwidth} Mbps`,
      status: 'Active'
    })
  }
  showSchedulerDialog.value = false
  resetForm()
}

function resetForm() {
  editMode.value = false
  currentStep.value = '1'
  policyForm.value = {
    name: '',
    description: '',
    targetType: '',
    targetGroup: '',
    scheduleType: 'recurring',
    recurringDays: [],
    startTime: '',
    endTime: '',
    bandwidth: '',
    priority: 2,
    enableQueueing: false
  }
}
</script>

<style scoped>
.v-stepper {
  box-shadow: none;
}
</style> 