import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  const user = computed(() => authStore.currentUser)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.error)
  const userRole = computed(() => authStore.userRole)

  const login = async (credentials) => {
    return await authStore.login(credentials)
  }

  const logout = () => {
    authStore.logout()
  }

  const clearError = () => {
    authStore.clearError()
  }

  const hasRole = (role) => {
    return authStore.hasRole(role)
  }

  const hasAnyRole = (roles) => {
    return authStore.hasAnyRole(roles)
  }

  const isAdmin = computed(() => authStore.hasRole('admin'))
  const isModerator = computed(() => authStore.hasRole('moderator'))
  const isUser = computed(() => authStore.hasRole('user'))

  return {
    user,
    isAuthenticated,
    loading,
    error,
    userRole,
    isAdmin,
    isModerator,
    isUser,
    login,
    logout,
    clearError,
    hasRole,
    hasAnyRole
  }
}