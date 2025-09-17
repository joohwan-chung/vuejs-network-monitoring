<template>
  <v-container fluid class="dashboard-container">
    <v-row>
      <v-col cols="12" class="d-flex align-center mb-4">
        <h1 class="text-h4">Dashboard</h1>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="showWidgetDialog = true"
        >
          Add Widget
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <draggable
        v-model="widgets"
        class="layout-grid"
        handle=".widget-handle"
        item-key="id"
      >
        <template #item="{ element }">
          <v-col :cols="element.size.cols" :md="element.size.md" :sm="element.size.sm" class="widget-wrapper">
            <v-card class="widget" elevation="2">
              <v-card-title class="widget-handle d-flex align-center py-2 px-4">
                {{ element.title }}
                <v-spacer></v-spacer>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      variant="text"
                      size="small"
                      v-bind="props"
                    ></v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="editWidget(element)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="removeWidget(element)">
                      <v-list-item-title>Remove</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>

              <v-card-text class="pa-4">
                <component
                  :is="element.component"
                  v-bind="element.props"
                ></component>
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </draggable>
    </v-row>

    <!-- Add Widget Dialog -->
    <v-dialog v-model="showWidgetDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 pa-4">Add Widget</v-card-title>
        <v-card-text class="pa-4">
          <v-select
            v-model="selectedWidgetType"
            :items="availableWidgets"
            label="Widget Type"
            item-title="title"
            item-value="type"
            class="mb-4"
          ></v-select>

          <v-text-field
            v-model="widgetTitle"
            label="Widget Title"
            class="mb-4"
          ></v-text-field>

          <v-select
            v-model="widgetSize"
            :items="widgetSizes"
            label="Widget Size"
            item-title="title"
            item-value="value"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="addWidget"
            :disabled="!selectedWidgetType || !widgetTitle"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import draggable from 'vuedraggable'

// Lazy load widget components
const TrafficWidget = defineAsyncComponent(() => import('@/components/widgets/TrafficWidget.vue'))
const SessionsWidget = defineAsyncComponent(() => import('@/components/widgets/SessionsWidget.vue'))
const SystemStatusWidget = defineAsyncComponent(() => import('@/components/widgets/SystemStatusWidget.vue'))
const QoSWidget = defineAsyncComponent(() => import('@/components/widgets/QoSWidget.vue'))
const EventsWidget = defineAsyncComponent(() => import('@/components/widgets/EventsWidget.vue'))

const showWidgetDialog = ref(false)
const selectedWidgetType = ref(null)
const widgetTitle = ref('')
const widgetSize = ref({ cols: 12, md: 6, sm: 12 })

const widgetSizes = [
  { title: 'Small (4 columns)', value: { cols: 12, md: 4, sm: 12 } },
  { title: 'Medium (6 columns)', value: { cols: 12, md: 6, sm: 12 } },
  { title: 'Large (12 columns)', value: { cols: 12, md: 12, sm: 12 } }
]

const availableWidgets = [
  { title: 'Traffic Overview', type: 'traffic', component: TrafficWidget },
  { title: 'Active Sessions', type: 'sessions', component: SessionsWidget },
  { title: 'System Status', type: 'system', component: SystemStatusWidget },
  { title: 'QoS Status', type: 'qos', component: QoSWidget },
  { title: 'Recent Events', type: 'events', component: EventsWidget }
]

const widgets = ref([
  {
    id: 1,
    title: 'Traffic Overview',
    component: TrafficWidget,
    size: { cols: 12, md: 6, sm: 12 },
    props: {}
  },
  {
    id: 2,
    title: 'System Status',
    component: SystemStatusWidget,
    size: { cols: 12, md: 6, sm: 12 },
    props: {}
  }
])

function addWidget() {
  const widget = availableWidgets.find(w => w.type === selectedWidgetType.value)
  if (widget) {
    widgets.value.push({
      id: Date.now(),
      title: widgetTitle.value,
      component: widget.component,
      size: widgetSize.value,
      props: {}
    })
    showWidgetDialog.value = false
    selectedWidgetType.value = null
    widgetTitle.value = ''
  }
}

function editWidget(widget) {
  // TODO: Implement widget editing
  console.log('Edit widget:', widget)
}

function removeWidget(widget) {
  const index = widgets.value.findIndex(w => w.id === widget.id)
  if (index !== -1) {
    widgets.value.splice(index, 1)
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 1rem;
}

.layout-grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.widget-wrapper {
  padding: 8px;
}

.widget {
  height: 100%;
  transition: box-shadow 0.2s ease;
}

.widget:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
}

.widget-handle {
  cursor: move;
  user-select: none;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

:deep(.v-card-text) {
  height: calc(100% - 48px);
}

@media (max-width: 960px) {
  .dashboard-container {
    padding: 0.5rem;
  }
  
  .widget-wrapper {
    padding: 4px;
  }
}
</style> 