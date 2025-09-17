<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    
    <v-toolbar-title>Task QoS</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item @click="handleProfile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
const handleProfile = () => {
  // TODO: Implement profile navigation
}

const handleLogout = () => {
  // TODO: Implement logout logic
}
</script> 