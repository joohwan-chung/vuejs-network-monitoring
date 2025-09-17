import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/views/qos/QoSPolicyView.vue')
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('@/views/monitoring/MonitoringView.vue'),
    redirect: '/monitor/l7-monitoring',
    children: [
      {
        path: 'l7-monitoring',
        name: 'L7Monitoring',
        component: () => import('@/views/monitoring/L7MonitoringView.vue')
      },
      {
        path: 'ip-traffic',
        name: 'IPTraffic',
        component: () => import('@/views/monitoring/IPTrafficView.vue')
      },
      {
        path: 'traffic-analysis',
        name: 'TrafficAnalysis',
        component: () => import('@/views/monitoring/TrafficAnalysisView.vue')
      }
    ]
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('@/views/monitoring/TrafficAnalysisView.vue')
  },
  {
    path: '/block',
    name: 'Block',
    component: () => import('@/views/block/BlockView.vue'),
    children: [
      {
        path: 'site-block',
        name: 'SiteBlock',
        component: () => import('@/views/block/SiteBlockView.vue')
      },
      {
        path: 'ddos-block',
        name: 'DDoSBlock',
        component: () => import('@/views/block/DDoSBlockView.vue')
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/system/SettingsView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/system/UsersView.vue')
  },
  {
    path: '/cli',
    name: 'CLI',
    component: () => import('@/views/cli/CLIView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 