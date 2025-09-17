<template>
  <v-card class="widget">
    <v-card-title class="text-h6 d-flex align-center">
      시스템 상태
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" variant="text" size="small" @click="refreshData"></v-btn>
    </v-card-title>
    <v-card-text>
      <v-row class="status-meters">
        <v-col cols="4" class="text-center">
          <v-progress-circular
            :model-value="cpuUsage"
            :color="getStatusColor(cpuUsage)"
            :size="90"
            :width="10"
          >
            <div class="status-value">
              <div class="text-h5">{{ cpuUsage }}%</div>
              <div class="text-caption text-medium-emphasis">CPU</div>
            </div>
          </v-progress-circular>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-progress-circular
            :model-value="memoryUsage"
            :color="getStatusColor(memoryUsage)"
            :size="90"
            :width="10"
          >
            <div class="status-value">
              <div class="text-h5">{{ memoryUsage }}%</div>
              <div class="text-caption text-medium-emphasis">메모리</div>
            </div>
          </v-progress-circular>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-progress-circular
            :model-value="diskUsage"
            :color="getStatusColor(diskUsage)"
            :size="90"
            :width="10"
          >
            <div class="status-value">
              <div class="text-h5">{{ diskUsage }}%</div>
              <div class="text-caption text-medium-emphasis">디스크</div>
            </div>
          </v-progress-circular>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-list density="compact" class="system-info">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary" size="small">mdi-clock-outline</v-icon>
          </template>
          <v-list-item-title class="text-body-2">시스템 가동시간</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{ uptime }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary" size="small">mdi-update</v-icon>
          </template>
          <v-list-item-title class="text-body-2">마지막 업데이트</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{ lastUpdate }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cpuUsage = ref(0)
const memoryUsage = ref(0)
const diskUsage = ref(0)
const uptime = ref('')
const lastUpdate = ref('')

const getStatusColor = (value) => {
  if (value < 60) return 'success'
  if (value < 80) return 'warning'
  return 'error'
}

const refreshData = () => {
  // TODO: API를 통해 실제 시스템 상태 데이터를 가져오는 로직 구현
  // 현재는 더미 데이터로 표시
  cpuUsage.value = Math.floor(Math.random() * 100)
  memoryUsage.value = Math.floor(Math.random() * 100)
  diskUsage.value = Math.floor(Math.random() * 100)
  uptime.value = '10일 15시간 30분'
  lastUpdate.value = new Date().toLocaleString()
}

onMounted(() => {
  refreshData()
  // 5초마다 데이터 갱신
  setInterval(refreshData, 5000)
})
</script>

<style scoped>
.widget {
  height: 100%;
  background: #fff;
}

.status-meters {
  padding: 1rem 0;
}

.status-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.system-info {
  background-color: #f5f5f5;
  border-radius: 4px;
}

:deep(.v-card-title) {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

:deep(.v-card-text) {
  padding: 1rem;
}

:deep(.v-list-item) {
  min-height: 44px;
}
</style> 