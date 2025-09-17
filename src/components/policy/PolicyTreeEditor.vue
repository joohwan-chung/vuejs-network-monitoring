<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Policy Tree</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="addNewPolicy">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-treeview
        v-model="selection"
        :items="items"
        item-children="children"
        item-text="name"
        selection-type="independent"
        return-object
        hoverable
      >
        <template v-slot:prepend="{ item }">
          <v-icon>{{ getIcon(item.type) }}</v-icon>
        </template>
        
        <template v-slot:append="{ item }">
          <v-btn icon size="small" @click="editPolicy(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="deletePolicy(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const selection = ref([])
const items = ref([
  {
    id: 1,
    name: 'Default Policy',
    type: 'policy',
    children: [
      {
        id: 2,
        name: 'Block Social Media',
        type: 'rule',
        children: []
      },
      {
        id: 3,
        name: 'QoS VoIP',
        type: 'rule',
        children: []
      }
    ]
  }
])

function getIcon(type) {
  switch (type) {
    case 'policy':
      return 'mdi-folder'
    case 'rule':
      return 'mdi-file-document'
    default:
      return 'mdi-file'
  }
}

function addNewPolicy() {
  // TODO: Implement add functionality
  console.log('Add new policy')
}

function editPolicy(item) {
  // TODO: Implement edit functionality
  console.log('Edit policy:', item)
}

function deletePolicy(item) {
  // TODO: Implement delete functionality
  console.log('Delete policy:', item)
}
</script> 