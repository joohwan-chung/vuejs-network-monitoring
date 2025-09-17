<template>
  <v-card class="widget">
    <v-card-title class="text-h6 d-flex align-center">
      트래픽 현황
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" variant="text" size="small" @click="refreshData"></v-btn>
    </v-card-title>
    <v-card-text>
      <v-row class="traffic-stats mb-4">
        <v-col cols="6" class="text-center">
          <div class="text-h4 font-weight-bold text-primary">{{ inboundTraffic }}</div>
          <div class="text-subtitle-2 text-medium-emphasis">수신 트래픽</div>
        </v-col>
        <v-col cols="6" class="text-center">
          <div class="text-h4 font-weight-bold text-primary">{{ outboundTraffic }}</div>
          <div class="text-subtitle-2 text-medium-emphasis">송신 트래픽</div>
        </v-col>
      </v-row>
      <div class="chart-container">
        <v-chart class="traffic-chart" :option="chartOption" autoresize />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { provide } from 'vue'

provide(THEME_KEY, 'light')

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const inboundTraffic = ref('0 Mbps')
const outboundTraffic = ref('0 Mbps')

const chartOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['수신', '송신'],
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      lineStyle: {
        color: '#666'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: 'Mbps',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#ddd',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '수신',
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#1867C0'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(24,103,192,0.3)'
          }, {
            offset: 1,
            color: 'rgba(24,103,192,0.1)'
          }]
        }
      }
    },
    {
      name: '송신',
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#4CAF50'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(76,175,80,0.3)'
          }, {
            offset: 1,
            color: 'rgba(76,175,80,0.1)'
          }]
        }
      }
    }
  ]
})

const refreshData = () => {
  // TODO: API를 통해 실제 트래픽 데이터를 가져오는 로직 구현
  // 현재는 더미 데이터로 표시
  inboundTraffic.value = '150 Mbps'
  outboundTraffic.value = '80 Mbps'
  
  const times = Array.from({length: 10}, (_, i) => `${i}:00`)
  const inData = Array.from({length: 10}, () => Math.floor(Math.random() * 200))
  const outData = Array.from({length: 10}, () => Math.floor(Math.random() * 150))
  
  chartOption.value.xAxis.data = times
  chartOption.value.series[0].data = inData
  chartOption.value.series[1].data = outData
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

.traffic-stats {
  padding: 1rem 0;
}

.chart-container {
  position: relative;
  height: 300px;
}

.traffic-chart {
  height: 100%;
  width: 100%;
}

:deep(.v-card-title) {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

:deep(.v-card-text) {
  padding: 1rem;
}
</style> 