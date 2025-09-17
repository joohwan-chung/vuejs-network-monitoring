<template>
  <v-card class="widget">
    <v-card-title class="text-h6">
      세션 현황
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" variant="text" size="small" @click="refreshData"></v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div class="text-center">
            <div class="text-h5">{{ activeSessions }}</div>
            <div class="text-caption">활성 세션</div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-center">
            <div class="text-h5">{{ totalSessions }}</div>
            <div class="text-caption">전체 세션</div>
          </div>
        </v-col>
      </v-row>
      <v-list density="compact">
        <v-list-subheader>최근 세션</v-list-subheader>
        <v-list-item v-for="session in recentSessions" :key="session.id">
          <v-list-item-title>{{ session.ip }}</v-list-item-title>
          <v-list-item-subtitle>{{ session.protocol }} - {{ session.duration }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeSessions = ref(0)
const totalSessions = ref(0)
const recentSessions = ref([])

const refreshData = () => {
  // TODO: API를 통해 실제 세션 데이터를 가져오는 로직 구현
  // 현재는 더미 데이터로 표시
  activeSessions.value = Math.floor(Math.random() * 1000)
  totalSessions.value = activeSessions.value + Math.floor(Math.random() * 2000)
  
  recentSessions.value = [
    { id: 1, ip: '192.168.1.100', protocol: 'TCP', duration: '00:15:30' },
    { id: 2, ip: '192.168.1.101', protocol: 'UDP', duration: '00:10:15' },
    { id: 3, ip: '192.168.1.102', protocol: 'TCP', duration: '00:05:45' },
    { id: 4, ip: '192.168.1.103', protocol: 'HTTP', duration: '00:02:30' },
  ]
}

onMounted(() => {
  refreshData()
})
</script>

<style scoped>
.widget {
  height: 100%;
}
</style> 