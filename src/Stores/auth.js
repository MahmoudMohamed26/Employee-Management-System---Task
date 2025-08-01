import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import users from '@/Database/users.json'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const userRole = computed(() => user.value?.role || null)
  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const foundUser = users.users.find(
        u => u.email === credentials.username && u.password === credentials.password
      )

      if (!foundUser) {
        error.value = 'Invalid email or password'
        return { success: false, message: 'Invalid credentials' }
      }

      const mockToken = `jwt_token_${foundUser.id}_${Date.now()}`

      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
      }

      user.value = userData
      token.value = mockToken

      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('userData', JSON.stringify(userData))

      return { 
        success: true, 
        user: userData, 
        token: mockToken 
      }

    } catch (err) {
      error.value = 'Login failed. Please try again.'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('userData')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  const clearError = () => {
    error.value = null
  }

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('userData', JSON.stringify(user.value))
  }

  const hasRole = (role) => {
    return user.value?.role === role
  }
  const hasAnyRole = (roles) => {
    return roles.includes(user.value?.role)
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    currentUser,
    userRole,
    login,
    logout,
    initializeAuth,
    clearError,
    updateUser,
    hasRole,
    hasAnyRole
  }
})