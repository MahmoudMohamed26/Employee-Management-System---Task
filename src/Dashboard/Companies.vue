<template>
  <div class="space-y-6">
    <div class="flex justify-between md:items-center gap-4 md:flex-row flex-col">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ t("companies.title") }}
      </h2>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 w-fit hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        :class="{ 'space-x-reverse': isArabic }"
      >
        <Plus class="w-4 h-4" />
        <span>{{ t("companies.add") }}</span>
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
              :placeholder="t('companies.search')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'pr-10 pl-4': isArabic }"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{{ t("companies.filter.all") }}</option>
            <option value="active">{{ t("companies.filter.active") }}</option>
            <option value="inactive">
              {{ t("companies.filter.inactive") }}
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
                {{ t("companies.table.name") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("companies.table.email") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("companies.table.phone") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("companies.table.parentCompany") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("companies.table.status") }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                :class="{ 'text-right': isArabic }"
              >
                {{ t("companies.table.actions") }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="company in filteredCompanies"
              :key="company.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center min-w-0">
                  <div
                    class="w-10 h-10 bg-blue-100 me-3 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <span class="text-blue-600 font-medium text-sm">
                      {{
                        (isArabic ? company.nameAr : company.name)
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
                      {{ isArabic ? company.nameAr : company.name }}
                    </div>
                    <div class="text-sm text-gray-500 truncate">
                      {{ company.phone }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 truncate max-w-xs">
                  {{ company.email }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 truncate max-w-40">
                  {{ company.phone }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 truncate max-w-32">
                  {{ getParentCompanyName(company.parentCompanyId) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                  :class="
                    company.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ t(`companies.status.${company.status}`) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-shrink-0">
                  <button
                    @click="editCompany(company)"
                    class="text-blue-600 hover:text-blue-900 transition-colors p-1"
                    :title="t('companies.actions.edit')"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteCompany(company)"
                    class="text-red-600 hover:text-red-900 transition-colors p-1"
                    :title="t('companies.actions.delete')"
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
          v-for="company in filteredCompanies"
          :key="company.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-2"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center me-3"
              >
                <span class="text-blue-600 font-medium text-sm">
                  {{
                    (isArabic ? company.nameAr : company.name)
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
                  {{ isArabic ? company.nameAr : company.name }}
                </div>
                <div class="text-sm text-gray-500">{{ company.email }}</div>
              </div>
            </div>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="
                company.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              "
            >
              {{ t(`companies.status.${company.status}`) }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-1 text-sm mb-4">
            <div>
              <span class="text-gray-500"
                >{{ t("companies.table.phone") }}:</span
              >
              <div class="font-medium truncate">
                {{ company.phone }}
              </div>
            </div>
            <div>
              <span class="text-gray-500"
                >{{ t("companies.table.parentCompany") }}:</span
              >
              <div class="font-medium truncate">
                {{ getParentCompanyName(company.parentCompanyId) }}
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-2 pt-3 border-t border-gray-300">
            <button
              @click="editCompany(company)"
              class="text-blue-600 hover:text-blue-900 transition-colors p-2"
            >
              <Edit class="w-4 h-4" />
            </button>
            <button
              @click="deleteCompany(company)"
              class="text-red-600 hover:text-red-900 transition-colors p-2"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredCompanies.length === 0" class="text-center py-12">
        <Building2 class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          {{ t("companies.empty.title") }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ t("companies.empty.description") }}
        </p>
      </div>
    </div>

    <Pagination />

    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black opacity-60 h-full w-full z-50"
      @click="closeModals"
    ></div>
    <div
      v-if="showAddModal || showEditModal"
      class="absolute z-51 right-1/2 x-translate bg-white top-5 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md"
      @click.stop
    >
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{
            showEditModal ? t("companies.editTitle") : t("companies.addTitle")
          }}
        </h3>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("companies.name") }} *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                :placeholder="t('companies.form.namePlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("companies.nameAr") }} *
              </label>
              <input
                v-model="form.nameAr"
                type="text"
                required
                :placeholder="t('companies.form.nameArPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("companies.email") }} *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                :placeholder="t('companies.form.emailPlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("companies.phone") }} *
              </label>
              <input
                v-model="form.phone"
                type="tel"
                required
                :placeholder="t('companies.form.phonePlaceholder')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("companies.parentCompany") }}
              </label>
              <select
                v-model="form.parentCompanyId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{{ t("companies.form.noParent") }}</option>
                <option
                  v-for="company in availableParentCompanies"
                  :key="company.id"
                  :value="company.id"
                >
                  {{ isArabic ? company.nameAr : company.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("companies.status.status") }}
              </label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">
                  {{ t("companies.status.active") }}
                </option>
                <option value="inactive">
                  {{ t("companies.status.inactive") }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t("companies.address") }} *
            </label>
            <input
              v-model="form.address"
              type="text"
              required
              :placeholder="t('companies.form.addressPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t("companies.addressAr") }} *
            </label>
            <input
              v-model="form.addressAr"
              type="text"
              required
              :placeholder="t('companies.form.addressArPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="flex justify-end gap-3 space-x-3 pt-4">
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
          {{ t("companies.confirmDelete") }}
        </h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            {{ t("companies.deleteWarning") }}
          </p>
        </div>
        <div class="flex justify-center space-x-4 mt-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {{ t("companies.deleteCancel") }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
          >
            {{ t("companies.deleteConfirm") }}
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
  Building2,
  AlertTriangle,
} from "lucide-vue-next"
import Pagination from "../components/Pagination.vue"

export default {
  name: "CompaniesManagement",
  components: {
    Plus,
    Search,
    Edit,
    Trash2,
    Building2,
    AlertTriangle,
    Pagination
  },
  setup() {
    const { companies, isArabic, t, handleAddCompany, handleEditCompany, handleDeleteCompany } = inject('dashboardData');
    const searchTerm = ref("")
    const statusFilter = ref("all")
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const editingCompany = ref(null)
    const deletingCompany = ref(null)

    const form = ref({
      name: "",
      nameAr: "",
      email: "",
      phone: "",
      address: "",
      addressAr: "",
      parentCompanyId: "",
      status: "active",
    })

    const filteredCompanies = computed(() => {
      let filtered = [...companies.value];

      if (searchTerm.value) {
        const search = searchTerm.value.toLowerCase()
        filtered = filtered.filter(
          (company) =>
            company.name.toLowerCase().includes(search) ||
            company.nameAr.toLowerCase().includes(search) ||
            company.email.toLowerCase().includes(search) ||
            company.phone.toLowerCase().includes(search)
        )
      }

      if (statusFilter.value !== "all") {
        filtered = filtered.filter(
          (company) => company.status === statusFilter.value
        )
      }

      return filtered
    })

    const availableParentCompanies = computed(() => {
      if (editingCompany.value) {
        return companies.value.filter((c) => c.id !== editingCompany.value.id)
      }
      return companies.value
    })

    const getParentCompanyName = (parentId) => {
      if (!parentId) return t("companies.form.noParent")
      const parent = companies.value.find((c) => c.id === parentId)
      if (!parent) return t("companies.form.noParent")
      return isArabic.value ? parent.nameAr : parent.name
    }

    const resetForm = () => {
      form.value = {
        name: "",
        nameAr: "",
        email: "",
        phone: "",
        address: "",
        addressAr: "",
        parentCompanyId: "",
        status: "active",
      }
    }

    const closeModals = () => {
      showAddModal.value = false
      showEditModal.value = false
      editingCompany.value = null
      resetForm()
    }

    const editCompany = (company) => {
      editingCompany.value = company
      form.value = {
        ...company,
        parentCompanyId: company.parentCompanyId || "",
      }
      showEditModal.value = true
    }

    const deleteCompany = (company) => {
      deletingCompany.value = company
      showDeleteModal.value = true
    }

    const submitForm = () => {
      const formData = {
        ...form.value,
        parentCompanyId: form.value.parentCompanyId || null,
      }

      if (showEditModal.value) {
        handleEditCompany(editingCompany.value.id, formData)
      } else {
        handleAddCompany(formData)
      }
      closeModals()
    }

    const confirmDelete = () => {
      handleDeleteCompany(deletingCompany.value.id)
      showDeleteModal.value = false
      deletingCompany.value = null
    }

    return {
      searchTerm,
      statusFilter,
      showAddModal,
      showEditModal,
      showDeleteModal,
      form,
      filteredCompanies,
      availableParentCompanies,
      getParentCompanyName,
      closeModals,
      editCompany,
      deleteCompany,
      submitForm,
      confirmDelete,
      t,
      isArabic,
    }
  },
}
</script>
