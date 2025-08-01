# HR Dashboard — Technical Task

This project is a frontend HR management dashboard built using **Vue.js**, **TailwindCSS**, and **Vite**. It supports full CRUD operations, authentication, role-based access control (RBAC), multilingual support (English & Arabic), and a responsive, accessible UI.

---

## 🚀 Features

### ✅ Authentication & Access
- **Login / Logout flow**
- **Forget password UI**
- **User session saved to localStorage**
- **Role-based access control** (RBAC)

### 🧑‍💼 User Management
- **Companies** (with parent-child company structure)
- **Departments**
- **Employees**
- Inline profile editing
- Search, filter, and sort
- Responsive design for mobile/tablet/desktop

### 🌍 Internationalization (i18n)
- English & Arabic language support
- RTL support for Arabic
- Live language switching

### 📋 Additional Features
- Audit logs (e.g., actions like edits and deletions)
- Search & filtering on all major list views
- Parent company drill-down view
- Confirmation modals for destructive actions
- Fully responsive UI

---

## 🛠 Tech Stack

| Tool         | Description                          |
|--------------|--------------------------------------|
| **Vue 3**     | Frontend framework (Composition API) |
| **Vite**     | Fast build tool for Vue              |
| **TailwindCSS** | Utility-first CSS framework         |
| **Pinia**    | State management                     |
| **Vue Router** | Client-side routing                 |
| **vue-i18n** | Internationalization (EN/AR support) |
| **LocalStorage** | Session persistence               |

---

## 📦 Project Setup

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview