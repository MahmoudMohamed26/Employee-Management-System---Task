import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../Stores/auth"
import DashboardLayout from "../Dashboard/Dashboard.vue"
import Profile from "../Views/Profile.vue"
import ForgetPassword from "../Views/ForgetPassword.vue"
import AuditLog from "../Views/AuditLog.vue"
import CompaniesManagement from "../Dashboard/Companies.vue"
import DepartmentsManagement from "../Dashboard/Departments.vue"
import EmployeesManagement from "../Dashboard/Employees.vue"

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: {
          beforeRouteEnter(to, from, next) {
            const authStore = useAuthStore();
            const userRole = authStore.userRole;
            if (userRole === 'employee') {
              next('/employees');
            } else {
              next('/companies');
            }
          }
        }
      },
      {
        path: "/companies",
        name: "Companies",
        component: CompaniesManagement,
        meta: { requiresAuth: true, roles: ['admin', 'manager'] },
      },
      {
        path: "/departments",
        name: "Departments",
        component: DepartmentsManagement,
        meta: { requiresAuth: true, roles: ['admin', 'manager'] },
      },
      {
        path: "/employees",
        name: "Employees",
        component: () => import("../Dashboard/Employees.vue"),
        meta: { requiresAuth: true, roles: ['admin', 'manager', 'employee'] },
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { requiresAuth: true, roles: ['admin', 'manager', 'employee'] },
      },
      {
        path: "/audit-log",
        name: "AuditLog",
        component: () => import("../Views/AuditLog.vue"),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
    ],
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../Views/SignIn.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: () => import("../Views/ForgetPassword.vue"),
    meta: { requiresGuest: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'SignIn' });
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next('/');
  }

  if (to.meta.roles) {
    const userRole = authStore.userRole;
    if (to.meta.roles.includes(userRole)) {
      return next();
    } else {
      return next('/');
    }
  }

  next();
});

export default router
