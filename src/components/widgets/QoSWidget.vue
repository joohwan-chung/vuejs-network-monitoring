<template>
  <v-card class="widget">
    <v-card-title class="text-h6">
      QoS 상태
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" variant="text" size="small" @click="refreshData"></v-btn>
    </v-card-title>
    <v-card-text>
      <v-list density="compact">
        <v-list-item>
          <v-list-item-title>패킷 손실률</v-list-item-title>
          <v-list-item-subtitle>
            <v-progress-linear
              :model-value="packetLoss"
              :color="getStatusColor(packetLoss)"
              height="20"
            >
              <template v-slot:default>{{ packetLoss }}%</template>
            </v-progress-linear>
          </v-list-item-subtitle>
        </v-list-item>
        
        <v-list-item>
          <v-list-item-title>지연시간</v-list-item-title>
          <v-list-item-subtitle>
            <v-progress-linear
              :model-value="latency"
              :color="getStatusColor(latency)"
              height="20"
            >
              <template v-slot:default>{{ latency }}ms</template>
            </v-progress-linear>
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>대역폭 사용률</v-list-item-title>
          <v-list-item-subtitle>
            <v-progress-linear
              :model-value="bandwidth"
              :color="getStatusColor(bandwidth)"
              height="20"
            >
              <template v-slot:default>{{ bandwidth }}%</template>
            </v-progress-linear>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-table density="compact" class="mt-4">
        <thead>
          <tr>
            <th>정책 이름</th>
            <th>상태</th>
            <th>우선순위</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="policy in policies" :key="policy.id">
            <td>{{ policy.name }}</td>
            <td>
              <v-chip
                :color="policy.active ? 'success' : 'error'"
                size="small"
              >
                {{ policy.active ? '활성' : '비활성' }}
              </v-chip>
            </td>
            <td>{{ policy.priority }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const packetLoss = ref(0)
const latency = ref(0)
const bandwidth = ref(0)
const policies = ref([])

const getStatusColor = (value) => {
  if (value < 30) return 'success'
  if (value < 70) return 'warning'
  return 'error'
}

const refreshData = () => {
  // TODO: API를 통해 실제 QoS 데이터를 가져오는 로직 구현
  // 현재는 더미 데이터로 표시
  packetLoss.value = Math.floor(Math.random() * 10)
  latency.value = Math.floor(Math.random() * 100)
  bandwidth.value = Math.floor(Math.random() * 100)
  
  policies.value = [
    { id: 1, name: 'VoIP 트래픽', active: true, priority: '높음' },
    { id: 2, name: '영상 스트리밍', active: true, priority: '중간' },
    { id: 3, name: '일반 데이터', active: true, priority: '낮음' },
    { id: 4, name: 'P2P 제한', active: false, priority: '최저' }
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