<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('profile.title') }}</h1>
    <div v-if="currentUser" class="bg-white p-6 rounded-lg shadow-md">
      <form @submit.prevent="updateProfile">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">{{ $t('profile.username') }}</label>
            <input type="text" id="username" v-model="editableUser.username" class="w-full border duration-300 text-sm py-2 border-[#e2e6f1] focus:border focus:border-blue-500 special_shadow rounded-md outline-none p-2 my-2">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('profile.email') }}</label>
            <input type="email" id="email" v-model="editableUser.email" class="w-full border duration-300 focus:border focus:border-blue-500 text-sm py-2 border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2">
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{ $t('profile.save') }}</button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>{{ $t('common.loading') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../Stores/auth';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const { t } = useI18n();
const toast = useToast();

const currentUser = computed(() => authStore.currentUser);
const editableUser = ref({});

onMounted(() => {
  if (currentUser.value) {
    editableUser.value = { ...currentUser.value };
  }
});

const updateProfile = () => {
  authStore.updateUser(editableUser.value);
  toast.success(t('profile.updateSuccess'), {
            position: "top-center",
            timeout: 5000,
            closeOnClick: false,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: false
          });
};
</script>