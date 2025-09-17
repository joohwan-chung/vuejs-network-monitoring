import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isAuthenticated: true,
    user: {
      name: 'Test User',
      role: 'Administrator'
    },
    systemSettings: null
  }),
  
  actions: {
    async login(credentials) {
      // TODO: Implement login logic
      this.isAuthenticated = true
      this.user = {
        name: 'Test User',
        role: 'Administrator'
      }
    },
    
    async logout() {
      this.isAuthenticated = false
      this.user = null
    },
    
    async fetchSystemSettings() {
      // TODO: Implement settings fetch logic
    }
  }
}) 