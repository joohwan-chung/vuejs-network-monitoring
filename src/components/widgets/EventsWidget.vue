<template>
  <v-card class="widget">
    <v-card-title class="text-h6">
      시스템 이벤트
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" variant="text" size="small" @click="refreshData"></v-btn>
    </v-card-title>
    <v-card-text>
      <v-row class="mb-4">
        <v-col cols="4">
          <v-chip
            color="error"
            class="ma-2"
            size="small"
          >
            오류: {{ errorCount }}
          </v-chip>
        </v-col>
        <v-col cols="4">
          <v-chip
            color="warning"
            class="ma-2"
            size="small"
          >
            경고: {{ warningCount }}
          </v-chip>
        </v-col>
        <v-col cols="4">
          <v-chip
            color="info"
            class="ma-2"
            size="small"
          >
            정보: {{ infoCount }}
          </v-chip>
        </v-col>
      </v-row>

      <v-list density="compact" class="event-list">
        <v-list-item
          v-for="event in events"
          :key="event.id"
          :class="getEventClass(event.type)"
        >
          <template v-slot:prepend>
            <v-icon :color="getEventColor(event.type)" size="small">
              {{ getEventIcon(event.type) }}
            </v-icon>
          </template>
          <v-list-item-title>{{ event.message }}</v-list-item-title>
          <v-list-item-subtitle>{{ event.timestamp }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const errorCount = ref(0)
const warningCount = ref(0)
const infoCount = ref(0)
const events = ref([])

const getEventColor = (type) => {
  switch (type) {
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'info': return 'info'
    default: return 'grey'
  }
}

const getEventIcon = (type) => {
  switch (type) {
    case 'error': return 'mdi-alert-circle'
    case 'warning': return 'mdi-alert'
    case 'info': return 'mdi-information'
    default: return 'mdi-circle-small'
  }
}

const getEventClass = (type) => {
  return `event-item event-${type}`
}

const refreshData = () => {
  // TODO: API를 통해 실제 이벤트 데이터를 가져오는 로직 구현
  // 현재는 더미 데이터로 표시
  errorCount.value = Math.floor(Math.random() * 5)
  warningCount.value = Math.floor(Math.random() * 10)
  infoCount.value = Math.floor(Math.random() * 20)

  events.value = [
    { id: 1, type: 'error', message: '네트워크 연결 실패', timestamp: '1분 전' },
    { id: 2, type: 'warning', message: '높은 CPU 사용률 감지', timestamp: '5분 전' },
    { id: 3, type: 'info', message: '시스템 업데이트 완료', timestamp: '10분 전' },
    { id: 4, type: 'warning', message: '디스크 공간 부족', timestamp: '15분 전' },
    { id: 5, type: 'info', message: '새로운 사용자 로그인', timestamp: '20분 전' }
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

.event-list {
  max-height: 300px;
  overflow-y: auto;
}

.event-item {
  border-left: 3px solid transparent;
  margin-bottom: 2px;
}

.event-error {
  border-left-color: var(--v-error-base);
}

.event-warning {
  border-left-color: var(--v-warning-base);
}

.event-info {
  border-left-color: var(--v-info-base);
}
</style> 