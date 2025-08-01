<template>
  <div id="app">
    <!-- Language switcher -->
    <div class="fixed top-4 right-4 z-50">
      <select 
        v-model="currentLocale" 
        @change="changeLanguage"
        class="px-3 py-1 border rounded-md bg-white"
      >
        <option value="ar">العربية</option>
        <option value="en">English</option>
      </select>
    </div>
    
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'App',
  setup() {
    const { locale } = useI18n()
    const currentLocale = ref(locale.value)
    
    const changeLanguage = () => {
      locale.value = currentLocale.value
      localStorage.setItem('locale', currentLocale.value)
      document.documentElement.lang = currentLocale.value
      document.documentElement.dir = currentLocale.value === 'ar' ? 'rtl' : 'ltr'
    }
    
    onMounted(() => {
      const savedLocale = localStorage.getItem('locale')
      if (savedLocale) {
        currentLocale.value = savedLocale
        locale.value = savedLocale
      }
      
      document.documentElement.lang = currentLocale.value
      document.documentElement.dir = currentLocale.value === 'ar' ? 'rtl' : 'ltr'
    })
    
    return {
      currentLocale,
      changeLanguage
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[dir="rtl"] {
  text-align: right;
}

[dir="ltr"] {
  text-align: left;
}
</style>