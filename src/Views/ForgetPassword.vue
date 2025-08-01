<template>
  <div>
    <div
      class="bg-cover h-[100vh] bg-center relative"
      :style="{ backgroundImage: `url(${bg})` }"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-70"
      ></div>

      <div
        class="flex relative flex-col container items-center overflow-y-auto justify-center h-screen"
      >
        <div
          class="w-full py-[60px] flex items-center max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-2 text-center">
              {{ $t("forgetPassword.title") }}
            </h2>
            <p class="text-gray-500 text-center mb-6">
              {{ $t("forgetPassword.subtitle") }}
            </p>

            <Form :validation-schema="validationSchema" @submit="onSubmit">
              <Field name="email" v-slot="{ field, errorMessage, meta }">
                <FormInput
                  name="email"
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  @blur="field.onBlur"
                  id="email"
                  type="email"
                  :label="$t('forgetPassword.email')"
                  :placeholder="$t('forgetPassword.emailPlaceholder')"
                  :error-message="meta.touched ? errorMessage : ''"
                  autocomplete="email"
                />
              </Field>

              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="mt-5 w-full text-sm text-center text-white hover:bg-blue-800 bg-blue-600 duration-300 px-4 py-2 rounded disabled:opacity-50"
                >
                  <div
                    v-if="loading"
                    role="status"
                    class="flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      class="inline w-4 h-4 text-gray-200 animate-spin fill-white mr-2"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span>{{ $t("login.loading") }}</span>
                  </div>
                  <span v-else>{{ $t("forgetPassword.submitButton") }}</span>
                </button>

                <p class="mt-4 text-center">
                  <router-link
                    to="/"
                    class="cursor-pointer text-blue-600 hover:underline"
                  >
                    {{ $t("forgetPassword.backToLogin") }}
                  </router-link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Form, Field } from "vee-validate"
import * as yup from "yup"
import { useToast } from "vue-toastification"
import FormInput from "../components/FormInput.vue"
import bg from "@/assets/loginBG.png"

const { t } = useI18n()
const router = useRouter()
const toast = useToast()
const loading = ref(false)

const validationSchema = computed(() =>
  yup.object({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
  })
)

const onSubmit = async (values, { resetForm }) => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  loading.value = false
  resetForm()
  toast.success(t("forgetPassword.successMessage"), {
    position: "top-center",
    timeout: 5000,
  })

  setTimeout(() => {
    router.push("/")
  }, 2000)
}
</script>
