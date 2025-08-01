<template>
  <div class="min-h-screen bg-gray-50" :class="{ rtl: isArabic }">
    <nav
      class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              :class="isArabic ? 'ml-3' : 'mr-3'"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            <div class="flex-shrink-0">
              <h1 class="text-xl font-semibold text-blue-600">
                {{ t("dashboard.title") }}
              </h1>
            </div>
          </div>

          <div class="flex items-center">
            <button
              @click="toggleLanguage"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {{ currentLanguage === "en" ? "العربية" : "English" }}
            </button>

            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div
                  class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-600 font-medium">{{
                    currentUser?.username?.charAt(0).toUpperCase()
                  }}</span>
                </div>
                <span class="hidden md:block">{{ currentUser?.username }}</span>
                <svg
                  class="w-4 h-4"
                  :class="{ 'rotate-180': showUserMenu }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div
                v-if="showUserMenu"
                class="absolute mt-2 w-48 end-0 bg-white rounded-md shadow-lg border border-gray-200 z-10"
              >
                <div class="py-1">
                  <router-link
                    to="/profile"
                    @click="showUserMenu = false"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {{ t("dashboard.profile") }}
                  </router-link>
                  <a
                    href="#"
                    @click="logout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {{ t("dashboard.logout") }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex pt-16">
      <div
        v-if="sidebarOpen"
        @click="closeSidebar"
        class="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
      ></div>

      <div
        class="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen fixed top-16 z-40 transform transition-transform duration-300 ease-in-out"
        :class="[
          isArabic ? 'right-0' : 'left-0',
          {
            'lg:translate-x-0': !isArabic,
            'lg:-translate-x-0': isArabic,
            '-translate-x-full': !sidebarOpen && !isArabic,
            'translate-x-full': !sidebarOpen && isArabic,
            'translate-x-0': sidebarOpen && !isArabic,
            '-translate-x-0': sidebarOpen && isArabic,
          },
        ]"
      >
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <router-link
              v-for="item in menuItems"
              :key="item.key"
              :to="item.route"
              @click="closeSidebarOnMobile"
              class="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-left transition-colors"
              :class="[
                $route.path === item.route
                  ? 'bg-blue-50 text-blue-700 border-e-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 flex-shrink-0"
                :class="[
                  $route.path === item.route
                    ? 'text-blue-700'
                    : 'text-gray-400 group-hover:text-gray-500',
                  isArabic ? 'ml-3' : 'mr-3',
                ]"
              />
              {{ t(`dashboard.${item.key}`) }}
            </router-link>
          </div>
        </nav>
      </div>

      <div
        class="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out"
        :class="{
          'lg:ml-64': !isArabic,
          'lg:mr-64': isArabic,
        }"
      >
        <div
          v-if="isLoadingTranslations"
          class="flex items-center justify-center h-64"
        >
          <div class="text-gray-500">
            {{ t("common.loading") || "Loading..." }}
          </div>
        </div>

        <router-view v-else />
      </div>
    </div>

    <div
      v-if="showUserMenu"
      @click="showUserMenu = false"
      class="fixed inset-0 z-30"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, provide, watch } from "vue"
import { useAuthStore } from "../Stores/auth"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { Building2, Users, UserCheck, ScrollText } from "lucide-vue-next"
import { mockAPI } from "../mock/mockData"

export default {
  name: "DashboardLayout",
  components: {
    Building2,
    Users,
    UserCheck,
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const { t, locale } = useI18n()

    const currentLanguage = computed(() => locale.value)
    const isLoadingTranslations = ref(false)
    const showUserMenu = ref(false)

    const companies = ref([])
    const departments = ref([])
    const employees = ref([])

    const isArabic = computed(() => currentLanguage.value === "ar")

    const menuItems = computed(() => {
      const allItems = [
        {
          key: "companies",
          route: "/companies",
          label: t("dashboard.companies"),
          icon: Building2,
          roles: ['admin', 'manager'],
        },
        {
          key: "departments",
          route: "/departments",
          label: t("dashboard.departments"),
          icon: Users,
          roles: ['admin', 'manager'],
        },
        {
          key: "employees",
          route: "/employees",
          label: t("dashboard.employees"),
          icon: UserCheck,
          roles: ['admin', 'manager', 'employee'],
        },
        {
          key: "audit-log",
          route: "/audit-log",
          label: t("dashboard.audit-log"),
          icon: ScrollText,
          roles: ['admin'],
        },
      ];

      const userRole = authStore.userRole;
      if (!userRole) return [];

      return allItems.filter(item => item.roles.includes(userRole));
    });

    const sidebarOpen = ref(false)

    const currentUser = computed(() => authStore.currentUser)

    const initializeLanguage = () => {
      const savedLanguage = localStorage.getItem('userLanguage') || 'en';
      
      const supportedLanguages = ['en', 'ar'];
      const languageToUse = supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en';

      locale.value = languageToUse;
      
      document.documentElement.dir = languageToUse === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = languageToUse;
      
      localStorage.setItem('userLanguage', languageToUse);
      
      console.log('Language initialized to:', languageToUse);
    };

    const setLanguage = (lang) => {
      locale.value = lang;
    };

    const toggleLanguage = () => {
      const newLang = currentLanguage.value === "en" ? "ar" : "en"
      setLanguage(newLang)
    }

    const logout = () => {
      authStore.logout()
      window.location.href = "/signin"
    }

    const loadData = async () => {
      try {
        companies.value = await mockAPI.getCompanies()
        departments.value = await mockAPI.getDepartments()
        employees.value = await mockAPI.getEmployees()
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    const handleAddCompany = async (companyData) => {
      try {
        const newCompany = await mockAPI.createCompany(companyData)
        companies.value.push(newCompany)
      } catch (error) {
        console.error("Error adding company:", error)
      }
    }

    const handleEditCompany = async (id, companyData) => {
      try {
        const updatedCompany = await mockAPI.updateCompany(id, companyData)
        const index = companies.value.findIndex((c) => c.id === id)
        if (index !== -1) {
          companies.value[index] = updatedCompany
        }
      } catch (error) {
        console.error("Error updating company:", error)
      }
    }

    const handleDeleteCompany = async (id) => {
      try {
        await mockAPI.deleteCompany(id)
        companies.value = companies.value.filter((c) => c.id !== id)
      } catch (error) {
        console.error("Error deleting company:", error)
      }
    }

    const handleAddDepartment = async (departmentData) => {
      try {
        const newDepartment = await mockAPI.createDepartment(departmentData)
        departments.value.push(newDepartment)
      } catch (error) {
        console.error("Error adding department:", error)
      }
    }

    const handleEditDepartment = async (id, departmentData) => {
      try {
        const updatedDepartment = await mockAPI.updateDepartment(
          id,
          departmentData
        )
        const index = departments.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          departments.value[index] = updatedDepartment
        }
      } catch (error) {
        console.error("Error updating department:", error)
      }
    }

    const handleDeleteDepartment = async (id) => {
      try {
        await mockAPI.deleteDepartment(id)
        departments.value = departments.value.filter((d) => d.id !== id)
      } catch (error) {
        console.error("Error deleting department:", error)
      }
    }

    const handleAddEmployee = async (employeeData) => {
      try {
        const newEmployee = await mockAPI.createEmployee(employeeData)
        employees.value.push(newEmployee)
      } catch (error) {
        console.error("Error adding employee:", error)
      }
    }

    const handleEditEmployee = async (id, employeeData) => {
      try {
        const updatedEmployee = await mockAPI.updateEmployee(id, employeeData)
        const index = employees.value.findIndex((e) => e.id === id)
        if (index !== -1) {
          employees.value[index] = updatedEmployee
        }
      } catch (error) {
        console.error("Error updating employee:", error)
      }
    }

    const handleDeleteEmployee = async (id) => {
      try {
        await mockAPI.deleteEmployee(id)
        employees.value = employees.value.filter((e) => e.id !== id)
      } catch (error) {
        console.error("Error deleting employee:", error)
      }
    }

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const closeSidebar = () => {
      sidebarOpen.value = false
    }

    const closeSidebarOnMobile = () => {
      if (window.innerWidth < 1024) {
        closeSidebar()
      }
    }

    provide("dashboardData", {
      companies: companies,
      departments: departments,
      employees: employees,
      isArabic: isArabic,
      t: t,
      handleAddCompany,
      handleEditCompany,
      handleDeleteCompany,
      handleAddDepartment,
      handleEditDepartment,
      handleDeleteDepartment,
      handleAddEmployee,
      handleEditEmployee,
      handleDeleteEmployee,
    })

    watch(currentLanguage, (newLang) => {
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      localStorage.setItem('userLanguage', newLang);
      console.log('Language changed to:', newLang);
    });

    onMounted(async () => {

      initializeLanguage();
      
      await loadData();
    });

    return {
      route,
      currentLanguage,
      showUserMenu,
      companies,
      departments,
      employees,
      isLoadingTranslations,
      isArabic,
      menuItems,
      sidebarOpen,
      t,
      toggleLanguage,
      setLanguage,
      logout,
      currentUser,
      toggleSidebar,
      closeSidebar,
      closeSidebarOnMobile,
    }
  },
}
</script>