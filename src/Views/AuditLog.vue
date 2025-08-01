<template>
  <div class="bg-gray-50 min-h-screen">
    <h1 class="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-gray-800">{{ $t('auditLog.title') }}</h1>
    
    <div class="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {{ $t('auditLog.action') }}
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {{ $t('auditLog.user') }}
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {{ $t('auditLog.details') }}
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {{ $t('auditLog.timestamp') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="logs.length === 0">
              <td colspan="4" class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                {{ $t('auditLog.noLogs') }}
              </td>
            </tr>
            <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ log.action }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ log.user }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ log.details }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ new Date(log.timestamp).toLocaleString() }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="lg:hidden space-y-4">
      <div v-if="logs.length === 0" class="bg-white shadow-md rounded-lg p-6 text-center">
        <p class="text-gray-500">{{ $t('auditLog.noLogs') }}</p>
      </div>
      
      <div v-for="log in logs" :key="log.id" class="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ log.action }}</h3>
            <p class="text-sm text-gray-600">{{ $t('auditLog.user') }}: <span class="font-medium text-gray-900">{{ log.user }}</span></p>
          </div>
          <div class="text-right ml-4">
            <p class="text-xs text-gray-500">{{ new Date(log.timestamp).toLocaleDateString() }}</p>
            <p class="text-xs text-gray-500">{{ new Date(log.timestamp).toLocaleTimeString() }}</p>
          </div>
        </div>
        
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">{{ $t('auditLog.details') }}</p>
          <p class="text-sm text-gray-800">{{ log.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { mockAPI } from '../mock/mockData';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const logs = ref([]);

const loadLogs = async () => {
  try {
    logs.value = await mockAPI.getAuditLogs();
  } catch (error) {
    console.error('Error loading audit logs:', error);
  }
};

onMounted(() => {
  loadLogs();
});
</script>