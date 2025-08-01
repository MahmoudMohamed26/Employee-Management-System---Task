<template>
  <div>
    <label :for="id" class="block text-sm">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :name="name"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :data-testid="testId"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
        :class="[
          'w-full border duration-300 text-sm py-2 border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2',
          hasError ? 'border-red-500' : 'border-gray-300'
        ]"
      />
      
      <span 
        v-if="type === 'password'"
        @click="togglePasswordVisibility"
        class="absolute p-1 rounded-md text-blue-600 top-1/2 transform end-2.5 -translate-y-1/2 cursor-pointer"
      >
        <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
        </svg>
      </span>
    </div>
    
    <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'FormInput',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    testId: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  emits: ['update:modelValue', 'blur'],
  setup(props) {
    const showPassword = ref(false)
    
    const hasError = computed(() => !!props.errorMessage)
    
    const inputType = computed(() => {
      if (props.type === 'password') {
        return showPassword.value ? 'text' : 'password'
      }
      return props.type
    })
    
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }
    
    return {
      showPassword,
      hasError,
      inputType,
      togglePasswordVisibility
    }
  }
}
</script>