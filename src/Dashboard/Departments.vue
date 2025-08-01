<template>
  <div class="space-y-6">
    <div
      class="flex justify-between md:items-center gap-4 md:flex-row flex-col"
    >
      <h2 class="text-2xl font-bold text-gray-900">
        {{ t("departments.title") }}
      </h2>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 w-fit hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        :class="{ 'space-x-reverse': isArabic }"
      >
        <Plus class="w-4 h-4" />
        <span>{{ t("departments.add") }}</span>
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
              :placeholder="t('departments.search')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'pr-10 pl-4': isArabic }"
            />
          </div>
        </div>
        <div class="flex gap-2 flex-wrap">
          <select
            v-model="companyFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{{ t("departments.filter.company") }}</option>
            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ isArabic ? company.nameAr : company.name }}
            </option>
          </select>
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{{ t("departments.filter.status") }}</option>
            <option value="active">{{ t("departments.status.active") }}</option>
            <option value="inactive">
              {{ t("departments.status.inactive") }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="hidden 2xl:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("departments.table.name") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("departments.table.company") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("departments.table.budget") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("departments.table.status") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("departments.table.actions") }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="department in filteredDepartments"
              :key="department.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center min-w-0">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-full me-3 flex items-center justify-center flex-shrink-0"
                  >
                    <span class="text-blue-600 font-medium text-sm">
                      {{
                        (isArabic ? department.nameAr : department.name)
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      }}
                    </span>
                  </div>
                  <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate">
                      {{ isArabic ? department.nameAr : department.name }}
                    </div>
                    <div class="text-sm text-gray-500 truncate">
                      {{
                        isArabic
                          ? department.descriptionAr
                          : department.description
                      }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 truncate max-w-xs">
                  {{ getCompanyName(department.companyId) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  ${{ department.budget.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                  :class="
                    department.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ t(`departments.status.${department.status}`) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-shrink-0">
                  <button
                    @click="editDepartment(department)"
                    class="text-blue-600 hover:text-blue-900 transition-colors p-1"
                    :title="t('departments.actions.edit')"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteDepartment(department)"
                    class="text-red-600 hover:text-red-900 transition-colors p-1"
                    :title="t('departments.actions.delete')"
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
          v-for="department in filteredDepartments"
          :key="department.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-2"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center me-3"
              >
                <span class="text-blue-600 font-medium text-sm">
                  {{
                    (isArabic ? department.nameAr : department.name)
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()
                  }}
                </span>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {{ isArabic ? department.nameAr : department.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{
                    isArabic ? department.descriptionAr : department.description
                  }}
                </div>
              </div>
            </div>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="
                department.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              "
            >
              {{ t(`departments.status.${department.status}`) }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-1 text-sm mb-4">
            <div>
              <span class="text-gray-500"
                >{{ t("departments.table.company") }}:</span
              >
              <div class="font-medium truncate">
                {{ getCompanyName(department.companyId) }}
              </div>
            </div>
            <div>
              <span class="text-gray-500"
                >{{ t("departments.table.budget") }}:</span
              >
              <div class="font-medium">
                ${{ department.budget.toLocaleString() }}
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-2 pt-3 border-t border-gray-300">
            <button
              @click="editDepartment(department)"
              class="text-blue-600 hover:text-blue-900 transition-colors p-2"
            >
              <Edit class="w-4 h-4" />
            </button>
            <button
              @click="deleteDepartment(department)"
              class="text-red-600 hover:text-red-900 transition-colors p-2"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredDepartments.length === 0" class="text-center py-12">
        <Users class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          {{ t("departments.empty.title") }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ t("departments.empty.description") }}
        </p>
      </div>
    </div>

    <Pagination />

    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black opacity-60 overflow-y-auto h-full w-full z-50"
      @click="closeModals"
    ></div>
    <div
      v-if="showAddModal || showEditModal"
      class="absolute z-51 right-1/2 x-translate top-5 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{
            showEditModal
              ? t("departments.editTitle")
              : t("departments.addTitle")
          }}
        </h3>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("departments.name") }} *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                :placeholder="t('departments.form.namePlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("departments.nameAr") }} *
              </label>
              <input
                v-model="form.nameAr"
                type="text"
                required
                :placeholder="t('departments.form.nameArPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("departments.company") }} *
              </label>
              <select
                v-model="form.companyId"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">
                  {{ t("departments.form.selectCompany") }}
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
                {{ t("departments.budget") }} *
              </label>
              <input
                v-model="form.budget"
                type="number"
                step="0.01"
                min="0"
                required
                :placeholder="t('departments.form.budgetPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t("departments.status.status") }}
            </label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">
                {{ t("departments.status.active") }}
              </option>
              <option value="inactive">
                {{ t("departments.status.inactive") }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t("departments.description") }} *
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              required
              :placeholder="t('departments.form.descriptionPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t("departments.descriptionAr") }} *
            </label>
            <textarea
              v-model="form.descriptionAr"
              rows="3"
              required
              :placeholder="t('departments.form.descriptionArPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {{ t("departments.actions.cancel") }}
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
      class="fixed inset-0 bg-black opacity-50 overflow-y-auto h-full w-full z-50"
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
          {{ t("departments.confirmDelete") }}
        </h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            {{ t("departments.deleteWarning") }}
          </p>
        </div>
        <div class="flex justify-center space-x-4 mt-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {{ t("departments.deleteCancel") }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
          >
            {{ t("departments.deleteConfirm") }}
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
  Users,
  AlertTriangle,
} from "lucide-vue-next"
import Pagination from "../components/Pagination.vue"

export default {
  name: "DepartmentsManagement",
  components: {
    Plus,
    Search,
    Edit,
    Trash2,
    Users,
    AlertTriangle,
    Pagination,
  },
  setup() {
    const {
      departments,
      companies,
      employees,
      isArabic,
      t,
      handleAddDepartment,
      handleEditDepartment,
      handleDeleteDepartment,
    } = inject("dashboardData")
    const searchTerm = ref("")
    const companyFilter = ref("all")
    const statusFilter = ref("all")
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const editingDepartment = ref(null)
    const deletingDepartment = ref(null)

    const form = ref({
      name: "",
      nameAr: "",
      description: "",
      descriptionAr: "",
      companyId: "",
      managerId: "",
      budget: 0,
      status: "active",
    })

    const filteredDepartments = computed(() => {
      let filtered = [...departments.value]

      if (searchTerm.value) {
        const search = searchTerm.value.toLowerCase()
        filtered = filtered.filter(
          (department) =>
            department.name.toLowerCase().includes(search) ||
            department.nameAr.toLowerCase().includes(search) ||
            department.description.toLowerCase().includes(search) ||
            department.descriptionAr.toLowerCase().includes(search)
        )
      }

      if (companyFilter.value !== "all") {
        filtered = filtered.filter(
          (department) => department.companyId === parseInt(companyFilter.value)
        )
      }

      if (statusFilter.value !== "all") {
        filtered = filtered.filter(
          (department) => department.status === statusFilter.value
        )
      }

      return filtered
    })

    const availableManagers = computed(() => {
      return employees.value.filter((e) => e.role === "manager")
    })

    const getCompanyName = (companyId) => {
      const company = companies.value.find((c) => c.id === companyId)
      if (!company) return ""
      return isArabic.value ? company.nameAr : company.name
    }

    const getManagerName = (managerId) => {
      if (!managerId) return "-"
      const manager = employees.value.find((e) => e.id === managerId)
      if (!manager) return "-"
      return isArabic.value
        ? `${manager.firstNameAr} ${manager.lastNameAr}`
        : `${manager.firstName} ${manager.lastName}`
    }

    const getEmployeeFullName = (employee) => {
      if (isArabic.value) {
        return `${employee.firstNameAr} ${employee.lastNameAr}`
      }
      return `${employee.firstName} ${employee.lastName}`
    }

    const resetForm = () => {
      form.value = {
        name: "",
        nameAr: "",
        description: "",
        descriptionAr: "",
        companyId: "",
        managerId: "",
        budget: 0,
        status: "active",
      }
    }

    const closeModals = () => {
      showAddModal.value = false
      showEditModal.value = false
      editingDepartment.value = null
      resetForm()
    }

    const editDepartment = (department) => {
      editingDepartment.value = department
      form.value = {
        ...department,
        companyId: department.companyId.toString(),
        managerId: department.managerId ? department.managerId.toString() : "",
      }
      showEditModal.value = true
    }

    const deleteDepartment = (department) => {
      deletingDepartment.value = department
      showDeleteModal.value = true
    }

    const submitForm = () => {
      const formData = {
        ...form.value,
        companyId: parseInt(form.value.companyId),
        managerId: form.value.managerId ? parseInt(form.value.managerId) : null,
        budget: parseFloat(form.value.budget),
      }

      if (showEditModal.value) {
        handleEditDepartment(editingDepartment.value.id, formData)
      } else {
        handleAddDepartment(formData)
      }
      closeModals()
    }

    const confirmDelete = () => {
      handleDeleteDepartment(deletingDepartment.value.id)
      showDeleteModal.value = false
      deletingDepartment.value = null
    }

    return {
      searchTerm,
      companyFilter,
      statusFilter,
      showAddModal,
      showEditModal,
      showDeleteModal,
      form,
      filteredDepartments,
      availableManagers,
      getCompanyName,
      getManagerName,
      getEmployeeFullName,
      closeModals,
      editDepartment,
      deleteDepartment,
      submitForm,
      confirmDelete,
      t,
      isArabic,
      companies,
    }
  },
}
</script>
