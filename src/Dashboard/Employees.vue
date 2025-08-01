<template>
  <div class="space-y-6">
    <div
      class="flex justify-between md:items-center gap-4 md:flex-row flex-col"
    >
      <h2 class="text-2xl font-bold text-gray-900">
        {{ t("employees.title") }}
      </h2>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 w-fit hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        :class="{ 'space-x-reverse': isArabic }"
      >
        <Plus class="w-4 h-4" />
        <span>{{ t("dashboard.add") }}</span>
      </button>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              :class="{ 'right-3 left-auto': isArabic }"
            />
            <input
              v-model="searchTerm"
              type="text"
              :placeholder="t('dashboard.search')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'pr-10 pl-4': isArabic }"
            />
          </div>
        </div>
        <div class="flex gap-2 flex-wrap">
          <select
            v-model="departmentFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{{ t("dashboard.filter") }}</option>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id"
            >
              {{ isArabic ? department.nameAr : department.name }}
            </option>
          </select>
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{{ t("dashboard.status") }}</option>
            <option value="active">{{ t("dashboard.active") }}</option>
            <option value="inactive">{{ t("dashboard.inactive") }}</option>
          </select>
        </div>
      </div>
    </div>

    <div
      v-if="filteredEmployees.length > 0"
      class="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div class="hidden 2xl:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("employees.fullName") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("employees.email") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("employees.position") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("employees.department") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("employees.salary") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("dashboard.status") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("dashboard.actions") }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="employee in filteredEmployees"
              :key="employee.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center min-w-0">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-full me-3 flex items-center justify-center flex-shrink-0"
                  >
                    <span class="text-blue-600 font-medium text-sm">
                      {{ getInitials(employee) }}
                    </span>
                  </div>
                  <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate">
                      {{ getFullName(employee) }}
                    </div>
                    <div class="text-sm text-gray-500 truncate">
                      {{ employee.phone }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 truncate max-w-xs">
                  {{ employee.email }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 truncate max-w-40">
                  {{ isArabic ? employee.positionAr : employee.position }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 truncate max-w-32">
                  {{ getDepartmentName(employee.departmentId) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  ${{ employee.salary.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                  :class="
                    employee.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ t(`dashboard.${employee.status}`) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-shrink-0">
                  <button
                    @click="editEmployee(employee)"
                    class="text-blue-600 hover:text-blue-900 transition-colors p-1"
                    :title="t('dashboard.edit')"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteEmployee(employee)"
                    class="text-red-600 hover:text-red-900 transition-colors p-1"
                    :title="t('dashboard.delete')"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="2xl:hidden p-4 space-y-4">
        <div
          v-for="employee in filteredEmployees"
          :key="employee.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-2"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center me-3"
              >
                <span class="text-blue-600 font-medium text-sm">
                  {{ getInitials(employee) }}
                </span>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {{ getFullName(employee) }}
                </div>
                <div class="text-sm text-gray-500">{{ employee.email }}</div>
              </div>
            </div>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="
                employee.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              "
            >
              {{ t(`dashboard.${employee.status}`) }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-1 text-sm mb-4">
            <div>
              <span class="text-gray-500">{{ t("employees.position") }}:</span>
              <div class="font-medium truncate">
                {{ isArabic ? employee.positionAr : employee.position }}
              </div>
            </div>
            <div>
              <span class="text-gray-500"
                >{{ t("employees.department") }}:</span
              >
              <div class="font-medium truncate">
                {{ getDepartmentName(employee.departmentId) }}
              </div>
            </div>
            <div>
              <span class="text-gray-500">{{ t("employees.salary") }}:</span>
              <div class="font-medium">
                ${{ employee.salary.toLocaleString() }}
              </div>
            </div>
            <div>
              <span class="text-gray-500"
                >{{ t("employees.form.phone") }}:</span
              >
              <div class="font-medium">{{ employee.phone }}</div>
            </div>
          </div>

          <div class="flex justify-end space-x-2 pt-3 border-t border-gray-300">
            <button
              @click="editEmployee(employee)"
              class="text-blue-600 hover:text-blue-900 transition-colors p-2"
            >
              <Edit class="w-4 h-4" />
            </button>
            <button
              @click="deleteEmployee(employee)"
              class="text-red-600 hover:text-red-900 transition-colors p-2"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <UserCheck class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        {{ t("dashboard.noData") }}
      </h3>
    </div>

    <Pagination />

    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black opacity-60 overflow-y-auto h-full w-full z-50 max-h-screen"
      @click="closeModals"
    ></div>
    <div
      v-if="showAddModal || showEditModal"
      class="absolute z-51 top-0 right-1/2 x-translate mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white max-h-screen overflow-y-auto"
      @click.stop
    >
      <div class="">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{
            showEditModal ? t("employees.editTitle") : t("employees.addTitle")
          }}
        </h3>

        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <h4 class="text-base font-medium text-gray-900 mb-3">
              {{ t("employees.form.personalInfo") }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.firstName") }} *
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  required
                  :placeholder="t('employees.form.firstNamePlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.firstNameAr") }} *
                </label>
                <input
                  v-model="form.firstNameAr"
                  type="text"
                  required
                  :placeholder="t('employees.form.firstNamePlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.lastName") }} *
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  :placeholder="t('employees.form.lastNamePlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.lastNameAr") }} *
                </label>
                <input
                  v-model="form.lastNameAr"
                  type="text"
                  required
                  :placeholder="t('employees.form.lastNamePlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.gender") }} *
                </label>
                <select
                  v-model="form.gender"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">
                    {{ t("employees.form.selectGender") }}
                  </option>
                  <option value="male">
                    {{ t("employees.form.genders.male") }}
                  </option>
                  <option value="female">
                    {{ t("employees.form.genders.female") }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.birthDate") }}
                </label>
                <input
                  v-model="form.birthDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-base font-medium text-gray-900 mb-3">
              {{ t("employees.form.contactInfo") }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.email") }} *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  :placeholder="t('employees.form.emailPlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.phone") }} *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  :placeholder="t('employees.form.phonePlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("employees.form.address") }} *
              </label>
              <input
                v-model="form.address"
                type="text"
                required
                :placeholder="t('employees.form.addressPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("employees.form.addressAr") }} *
              </label>
              <input
                v-model="form.addressAr"
                type="text"
                required
                :placeholder="t('employees.form.addressArPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h4 class="text-base font-medium text-gray-900 mb-3">
              {{ t("employees.form.workInfo") }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.position") }} *
                </label>
                <input
                  v-model="form.position"
                  type="text"
                  required
                  :placeholder="t('employees.form.positionPlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.positionAr") }} *
                </label>
                <input
                  v-model="form.positionAr"
                  type="text"
                  required
                  :placeholder="t('employees.form.positionArPlaceholder')"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.company") }} *
                </label>
                <select
                  v-model="form.companyId"
                  required
                  @change="onCompanyChange"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">
                    {{ t("employees.form.selectCompany") }}
                  </option>
                  <option
                    v-for="company in companies"
                    :key="company.id"
                    :value="company.id"
                  >
                    {{ isArabic ? company.nameAr : company.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.department") }} *
                </label>
                <select
                  v-model="form.departmentId"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">
                    {{ t("employees.form.selectDepartment") }}
                  </option>
                  <option
                    v-for="department in availableDepartments"
                    :key="department.id"
                    :value="department.id"
                  >
                    {{ isArabic ? department.nameAr : department.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.salary") }} *
                </label>
                <input
                  v-model="form.salary"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("employees.form.hireDate") }} *
                </label>
                <input
                  v-model="form.hireDate"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t("dashboard.status") }}
                </label>
                <select
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">{{ t("dashboard.active") }}</option>
                  <option value="inactive">
                    {{ t("dashboard.inactive") }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div
            class="flex justify-end space-x-3"
            :class="{ 'space-x-reverse': isArabic }"
          >
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {{ t("dashboard.cancel") }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
            >
              {{
                showEditModal
                  ? t("departments.editTitle")
                  : t("departments.addTitle")
              }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black opacity-60 overflow-y-auto h-full w-full z-50"
      @click="showDeleteModal = false"
    ></div>
    <div
      v-if="showDeleteModal"
      class="absolute z-51 right-1/2 x-translate top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <div class="mt-3 text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
        >
          <AlertTriangle class="h-6 w-6 text-red-600" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mt-2">
          {{ t("employees.confirmDelete") }}
        </h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            {{ t("employees.deleteWarning") }}
          </p>
        </div>
        <div class="flex justify-center space-x-4 mt-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {{ t("dashboard.cancel") }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
          >
            {{ t("dashboard.delete") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from "vue"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  UserCheck,
  AlertTriangle,
} from "lucide-vue-next"
import en from "../locales/en.json"
import ar from "../locales/ar.json"
import Pagination from "../components/Pagination.vue"

export default {
  name: "EmployeesManagement",
  components: {
    Plus,
    Search,
    Edit,
    Trash2,
    UserCheck,
    AlertTriangle,
    Pagination,
  },
  setup() {
    const {
      employees,
      companies,
      departments,
      isArabic,
      t,
      handleAddEmployee,
      handleEditEmployee,
      handleDeleteEmployee,
    } = inject("dashboardData")
    const searchTerm = ref("")
    const departmentFilter = ref("all")
    const statusFilter = ref("all")
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const editingEmployee = ref(null)
    const deletingEmployee = ref(null)

    const form = ref({
      firstName: "",
      firstNameAr: "",
      lastName: "",
      lastNameAr: "",
      email: "",
      phone: "",
      position: "",
      positionAr: "",
      departmentId: "",
      companyId: "",
      salary: 0,
      hireDate: "",
      birthDate: "",
      address: "",
      addressAr: "",
      gender: "",
      status: "active",
    })

    const filteredEmployees = computed(() => {
      let filtered = [...employees.value]

      if (searchTerm.value) {
        const search = searchTerm.value.toLowerCase()
        filtered = filtered.filter(
          (employee) =>
            employee.firstName.toLowerCase().includes(search) ||
            employee.firstNameAr.toLowerCase().includes(search) ||
            employee.lastName.toLowerCase().includes(search) ||
            employee.lastNameAr.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search) ||
            employee.phone.toLowerCase().includes(search) ||
            employee.position.toLowerCase().includes(search) ||
            employee.positionAr.toLowerCase().includes(search)
        )
      }

      if (departmentFilter.value !== "all") {
        filtered = filtered.filter(
          (employee) =>
            employee.departmentId === parseInt(departmentFilter.value)
        )
      }

      if (statusFilter.value !== "all") {
        filtered = filtered.filter(
          (employee) => employee.status === statusFilter.value
        )
      }

      return filtered
    })

    const availableDepartments = computed(() => {
      if (form.value.companyId) {
        return departments.value.filter(
          (dept) => dept.companyId === parseInt(form.value.companyId)
        )
      }
      return departments.value
    })

    const getFullName = (employee) => {
      if (isArabic.value) {
        return `${employee.firstNameAr} ${employee.lastNameAr}`
      }
      return `${employee.firstName} ${employee.lastName}`
    }

    const getInitials = (employee) => {
      if (isArabic.value) {
        return `${employee.firstNameAr.charAt(0)}${employee.lastNameAr.charAt(
          0
        )}`.toUpperCase()
      }
      return `${employee.firstName.charAt(0)}${employee.lastName.charAt(
        0
      )}`.toUpperCase()
    }

    const getDepartmentName = (departmentId) => {
      if (!departmentId) return "-"
      const department = departments.value.find((d) => d.id === departmentId)
      if (!department) return "-"
      return isArabic.value ? department.nameAr : department.name
    }

    const onCompanyChange = () => {
      form.value.departmentId = ""
    }

    const resetForm = () => {
      form.value = {
        firstName: "",
        firstNameAr: "",
        lastName: "",
        lastNameAr: "",
        email: "",
        phone: "",
        position: "",
        positionAr: "",
        departmentId: "",
        companyId: "",
        salary: 0,
        hireDate: "",
        birthDate: "",
        address: "",
        addressAr: "",
        gender: "",
        status: "active",
      }
    }

    const closeModals = () => {
      showAddModal.value = false
      showEditModal.value = false
      editingEmployee.value = null
      resetForm()
    }

    const editEmployee = (employee) => {
      editingEmployee.value = employee
      form.value = {
        ...employee,
        companyId: employee.companyId.toString(),
        departmentId: employee.departmentId.toString(),
      }
      showEditModal.value = true
    }

    const deleteEmployee = (employee) => {
      deletingEmployee.value = employee
      showDeleteModal.value = true
    }

    const submitForm = () => {
      const formData = {
        ...form.value,
        companyId: parseInt(form.value.companyId),
        departmentId: parseInt(form.value.departmentId),
        salary: parseFloat(form.value.salary),
      }

      if (showEditModal.value) {
        handleEditEmployee(editingEmployee.value.id, formData)
      } else {
        handleAddEmployee(formData)
      }
      closeModals()
    }

    const confirmDelete = () => {
      handleDeleteEmployee(deletingEmployee.value.id)
      showDeleteModal.value = false
      deletingEmployee.value = null
    }

    return {
      searchTerm,
      departmentFilter,
      statusFilter,
      showAddModal,
      showEditModal,
      showDeleteModal,
      form,
      filteredEmployees,
      availableDepartments,
      getFullName,
      getInitials,
      departments,
      companies,
      getDepartmentName,
      onCompanyChange,
      closeModals,
      editEmployee,
      deleteEmployee,
      submitForm,
      confirmDelete,
      t,
      isArabic,
    }
  },
}
</script>
