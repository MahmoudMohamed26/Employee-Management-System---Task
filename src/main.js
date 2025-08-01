import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"
import App from './App.vue'
import router from './Router'
import i18n from './plugins/i18n'
import { useAuthStore } from './Stores/auth'

import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore()
authStore.initializeAuth()

app.use(router)
app.use(i18n)
app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
})

app.mount('#app')
