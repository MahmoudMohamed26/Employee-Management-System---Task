<template>
  <div>
    <div
      class="bg-cover h-[100vh] bg-center relative"
      :style="{ backgroundImage: `url(${bg})` }"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-70"
      ></div>

      <div class="absolute top-4 right-4 z-10">
        <select 
          v-model="selectedLanguage" 
          @change="handleLanguageChange"
          class="bg-white/90 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <div
        class="flex relative flex-col container items-center overflow-y-auto justify-center h-screen"
      >
        <div
          class="w-full py-[60px] flex items-center max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-6 text-center">
              {{ $t("login.title") }}
            </h2>

            <Form
              :validation-schema="validationSchema"
              @submit="onSubmit"
              v-slot="{ errors }"
            >
              <Field name="username" v-slot="{ field, errorMessage, meta }">
                <FormInput
                  name="username"
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  @blur="field.onBlur"
                  id="username"
                  type="email"
                  :label="$t('login.email')"
                  :placeholder="$t('login.emailPlaceholder')"
                  :error-message="meta.touched ? errorMessage : ''"
                  autocomplete="email"
                />
              </Field>

              <Field name="password" v-slot="{ field, errorMessage, meta }">
                <FormInput
                  name="password"
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  @blur="field.onBlur"
                  id="password"
                  type="password"
                  :label="$t('login.password')"
                  :placeholder="$t('login.passwordPlaceholder')"
                  :error-message="meta.touched ? errorMessage : ''"
                  autocomplete="current-password"
                />
              </Field>

              <div>
                <p class="flex justify-end">
                  <router-link
                    to="/forgetpassword"
                    class="cursor-pointer text-red-600 text-left text-sm hover:underline"
                  >
                    {{ $t("login.forgotPassword") }}
                  </router-link>
                </p>

                <button
                  type="submit"
                  data-testid="login-button"
                  :disabled="authStore.loading"
                  class="mt-5 w-full text-sm text-center text-white hover:bg-blue-800 bg-blue-600 duration-300 px-4 py-2 rounded disabled:opacity-50"
                >
                  <div
                    v-if="authStore.loading"
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
                  <span v-else>{{ $t("login.loginButton") }}</span>
                </button>

                <p v-if="authStore.error" class="text-red-500 text-sm mt-2">
                  {{ authStore.error }}
                </p>
              </div>
            </Form>

            <div
              v-if="showDebugInfo"
              class="mt-6 p-4 bg-gray-100 rounded text-xs"
            >
              <h3 class="font-bold mb-2">Test Accounts:</h3>
              <div class="space-y-1">
                <p><strong>Admin:</strong> admin@ems.com / admin123</p>
                <p><strong>Manager:</strong> john@example.com / password123</p>
                <p>
                  <strong>Employee:</strong> ahmed@example.com / password789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Form, Field } from "vee-validate"
import bg from "@/assets/loginBG.png"
import * as yup from "yup"
import { useAuthStore } from "../Stores/auth"
import { useToast } from "vue-toastification"
import FormInput from "../components/FormInput.vue"

export default {
  name: "SignIn",
  components: {
    Form,
    Field,
    FormInput,
  },
  setup() {
    const router = useRouter()
    const { t, locale } = useI18n()
    const authStore = useAuthStore()
    const toast = useToast()

    const showDebugInfo = ref(process.env.NODE_ENV === "development")
    const selectedLanguage = ref(locale.value)

    const validationSchema = computed(() =>
      yup.object({
        username: yup
          .string()
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            t("login.emailInvalid")
          )
          .required(t("login.emailRequired")),
        password: yup.string().required(t("login.passwordRequired")),
      })
    )

    const handleLanguageChange = (event) => {
      const newLocale = event.target ? event.target.value : event;
      
      locale.value = newLocale;
      selectedLanguage.value = newLocale;
      
      localStorage.setItem('userLanguage', newLocale);
      
      localStorage.setItem('locale', newLocale);

      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;

      toast.info(t('login.languageChanged'), {
        position: "top-center",
        timeout: 2000
      });
    };

    watch(locale, (newLocale) => {
      selectedLanguage.value = newLocale;
    });

    const onSubmit = async (values, { setFieldValue }) => {
      try {
        authStore.clearError()

        const result = await authStore.login({
          username: values.username,
          password: values.password,
        })

        if (result.success) {
          toast.success(t("login.success"), {
            position: "top-center",
            timeout: 5000,
            closeOnClick: false,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: false,
          })

          console.log("Login successful:", {
            id: result.user.id,
            username: result.user.username,
            email: result.user.email,
            role: result.user.role,
          })

          if (result.user.role === 'employee') {
            router.push("/employees");
          } else {
            router.push("/companies");
          }
        } else {
          setFieldValue("password", "")
          toast.error(result.message || t("login.loginError"), {
            position: "top-center",
            timeout: 3000,
          })
        }
      } catch (error) {
        console.error("Login error:", error)
        setFieldValue("password", "")
        toast.error(t("login.loginError"), {
          position: "top-center",
          timeout: 3000,
        })
      }
    }

    onMounted(() => {
      if (authStore.isAuthenticated) {
        router.push('/');
        return;
      }

      const savedLanguage = localStorage.getItem('userLanguage') || localStorage.getItem('locale');
      if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
        locale.value = savedLanguage;
        selectedLanguage.value = savedLanguage;
        
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = savedLanguage;
      }
    });

    return {
      validationSchema,
      authStore,
      onSubmit,
      bg,
      handleLanguageChange,
      showDebugInfo,
      selectedLanguage,
    }
  },
}
</script>

<style scoped>
.special_shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

:deep(.p-select) {
  text-align: start;
}

[dir="rtl"] :deep(.p-select) {
  text-align: right;
}

[dir="rtl"] :deep(.p-select-option) {
  text-align: right;
}

[dir="rtl"] select {
  text-align: right;
}
</style>