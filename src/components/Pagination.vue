<template>
  <div class="flex justify-end mt-4">
    <nav class="inline-flex items-center space-x-1">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ t('pagination.previous') }}
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-3 py-1 rounded',
          page === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ t('pagination.next') }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const currentPage = ref(1)
const totalPages = 5

const changePage = (page) => {
  if (page < 1 || page > totalPages) return
  currentPage.value = page
}
</script>
