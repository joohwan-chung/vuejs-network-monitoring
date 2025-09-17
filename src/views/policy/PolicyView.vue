<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Policy Management</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-tabs v-model="activeTab" show-arrows>
          <v-tab value="port-groups">Port Groups</v-tab>
          <v-tab value="ip-groups">IP Groups</v-tab>
          <v-tab value="app-groups">Application Groups</v-tab>
          <v-tab value="filters">Filters</v-tab>
          <v-tab value="qos">QoS Classes</v-tab>
          <v-tab value="policy-tree">Policy Tree</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="mt-4">
          <v-window-item value="port-groups">
            <port-group-editor />
          </v-window-item>

          <v-window-item value="ip-groups">
            <ip-group-editor />
          </v-window-item>

          <v-window-item value="app-groups">
            <application-group-editor />
          </v-window-item>

          <v-window-item value="filters">
            <filter-editor />
          </v-window-item>

          <v-window-item value="qos">
            <qos-editor />
          </v-window-item>

          <v-window-item value="policy-tree">
            <policy-tree-editor />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import ApplicationGroupEditor from '@/components/policy/ApplicationGroupEditor.vue'
import PortGroupEditor from '@/components/policy/PortGroupEditor.vue'
import IpGroupEditor from '@/components/policy/IpGroupEditor.vue'
import FilterEditor from '@/components/policy/FilterEditor.vue'
import QosEditor from '@/components/policy/QosEditor.vue'
import PolicyTreeEditor from '@/components/policy/PolicyTreeEditor.vue'

const activeTab = ref('app-groups')
</script>

<style scoped>
.v-window {
  background: white;
  border-radius: 4px;
  padding: 16px;
}
</style> 