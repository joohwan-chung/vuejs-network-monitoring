<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :rail="rail"
    @click="rail = false"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="userName"
        :subtitle="userRole"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :value="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/store'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const drawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const rail = ref(false)
const store = useMainStore()

const userName = computed(() => store.user?.name || 'User Name')
const userRole = computed(() => store.user?.role || 'Administrator')

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/'
  },
  {
    title: 'Policy Settings',
    icon: 'mdi-shield-lock',
    to: '/policy'
  },
  {
    title: 'Monitoring',
    icon: 'mdi-monitor',
    to: '/monitor'
  },
  {
    title: 'Analysis',
    icon: 'mdi-chart-bar',
    to: '/analysis'
  },
  {
    title: 'Block',
    icon: 'mdi-block-helper',
    to: '/block'
  },
  {
    title: 'System Settings',
    icon: 'mdi-cog',
    to: '/settings'
  },
  {
    title: 'Admin',
    icon: 'mdi-account-key',
    to: '/admin'
  },
  {
    title: 'CLI',
    icon: 'mdi-console',
    to: '/cli'
  }
]
</script> 