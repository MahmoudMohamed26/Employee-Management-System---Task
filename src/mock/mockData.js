// mockData.js - Mock database for the dashboard
import { useAuthStore } from '../Stores/auth';
import usersData from '../Database/users.json';
import auditLogDataFromFile from '../Database/auditLog.json';

export const mockData = {
  companies: [
    {
      id: 1,
      name: 'Tech Solutions Inc',
      nameAr: 'شركة الحلول التقنية المحدودة',
      email: 'info@techsolutions.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA 94025',
      addressAr: '123 شارع التقنية، وادي السيليكون، كاليفورنيا 94025',
      parentCompanyId: null,
      createdAt: '2023-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Global Marketing Ltd',
      nameAr: 'شركة التسويق العالمي المحدودة',
      email: 'contact@globalmarketing.com',
      phone: '+1-555-0456',
      address: '456 Business Ave, New York, NY 10001',
      addressAr: '456 شارع الأعمال، نيويورك، نيويورك 10001',
      parentCompanyId: 1,
      createdAt: '2023-02-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Innovation Labs',
      nameAr: 'مختبرات الابتكار',
      email: 'labs@innovation.com',
      phone: '+1-555-0789',
      address: '789 Innovation Blvd, Austin, TX 73301',
      addressAr: '789 شارع الابتكار، أوستن، تكساس 73301',
      parentCompanyId: null,
      createdAt: '2023-03-10',
      status: 'active'
    }
  ],
  
  departments: [
    {
      id: 1,
      name: 'Human Resources',
      nameAr: 'الموارد البشرية',
      description: 'Manages employee relations and company policies',
      descriptionAr: 'إدارة علاقات الموظفين وسياسات الشركة',
      companyId: 1,
      managerId: 1,
      budget: 150000,
      createdAt: '2023-01-20',
      status: 'active'
    },
    {
      id: 2,
      name: 'Information Technology',
      nameAr: 'تقنية المعلومات',
      description: 'Develops and maintains technical infrastructure',
      descriptionAr: 'تطوير وصيانة البنية التحتية التقنية',
      companyId: 1,
      managerId: 2,
      budget: 500000,
      createdAt: '2023-01-25',
      status: 'active'
    },
    {
      id: 3,
      name: 'Marketing',
      nameAr: 'التسويق',
      description: 'Promotes products and manages brand strategy',
      descriptionAr: 'ترويج المنتجات وإدارة استراتيجية العلامة التجارية',
      companyId: 2,
      managerId: 3,
      budget: 300000,
      createdAt: '2023-02-25',
      status: 'active'
    },
    {
      id: 4,
      name: 'Research & Development',
      nameAr: 'البحث والتطوير',
      description: 'Conducts research and develops new products',
      descriptionAr: 'إجراء البحوث وتطوير منتجات جديدة',
      companyId: 3,
      managerId: 4,
      budget: 750000,
      createdAt: '2023-03-15',
      status: 'active'
    }
  ],
  
  employees: [
    {
      id: 1,
      firstName: 'John',
      firstNameAr: 'جون',
      lastName: 'Smith',
      lastNameAr: 'سميث',
      email: 'john.smith@techsolutions.com',
      phone: '+1-555-1001',
      position: 'HR Manager',
      positionAr: 'مدير الموارد البشرية',
      departmentId: 1,
      companyId: 1,
      salary: 75000,
      hireDate: '2023-01-25',
      birthDate: '1985-05-15',
      address: '123 Residential St, San Jose, CA 95123',
      addressAr: '123 شارع السكني، سان خوسيه، كاليفورنيا 95123',
      status: 'active',
      gender: 'male'
    },
    {
      id: 2,
      firstName: 'Sarah',
      firstNameAr: 'سارة',
      lastName: 'Johnson',
      lastNameAr: 'جونسون',
      email: 'sarah.johnson@techsolutions.com',
      phone: '+1-555-1002',
      position: 'IT Manager',
      positionAr: 'مدير تقنية المعلومات',
      departmentId: 2,
      companyId: 1,
      salary: 85000,
      hireDate: '2023-02-01',
      birthDate: '1988-09-22',
      address: '456 Tech Avenue, Palo Alto, CA 94301',
      addressAr: '456 شارع التقنية، بالو ألتو، كاليفورنيا 94301',
      status: 'active',
      gender: 'female'
    },
    {
      id: 3,
      firstName: 'Michael',
      firstNameAr: 'مايكل',
      lastName: 'Brown',
      lastNameAr: 'براون',
      email: 'michael.brown@globalmarketing.com',
      phone: '+1-555-1003',
      position: 'Marketing Director',
      positionAr: 'مدير التسويق',
      departmentId: 3,
      companyId: 2,
      salary: 90000,
      hireDate: '2023-03-01',
      birthDate: '1982-12-10',
      address: '789 Marketing Plaza, New York, NY 10002',
      addressAr: '789 ساحة التسويق، نيويورك، نيويورك 10002',
      status: 'active',
      gender: 'male'
    },
    {
      id: 4,
      firstName: 'Emily',
      firstNameAr: 'إيميلي',
      lastName: 'Davis',
      lastNameAr: 'ديفيس',
      email: 'emily.davis@innovation.com',
      phone: '+1-555-1004',
      position: 'Research Lead',
      positionAr: 'رئيس البحوث',
      departmentId: 4,
      companyId: 3,
      salary: 95000,
      hireDate: '2023-03-20',
      birthDate: '1990-03-08',
      address: '321 Innovation Circle, Austin, TX 73302',
      addressAr: '321 دائرة الابتكار، أوستن، تكساس 73302',
      status: 'active',
      gender: 'female'
    },
    {
      id: 5,
      firstName: 'David',
      firstNameAr: 'ديفيد',
      lastName: 'Wilson',
      lastNameAr: 'ويلسون',
      email: 'david.wilson@techsolutions.com',
      phone: '+1-555-1005',
      position: 'Software Developer',
      positionAr: 'مطور البرمجيات',
      departmentId: 2,
      companyId: 1,
      salary: 70000,
      hireDate: '2023-04-15',
      birthDate: '1992-07-25',
      address: '555 Developer Lane, Mountain View, CA 94041',
      addressAr: '555 حارة المطور، ماونتن فيو، كاليفورنيا 94041',
      status: 'active',
      gender: 'male'
    }
  ]
};

export const mockAPI = {
  getCompanies: () => Promise.resolve(mockData.companies),
  getCompany: (id) => Promise.resolve(mockData.companies.find(c => c.id === id)),
  createCompany: (company) => {
    const newCompany = { ...company, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    mockAPI.createAuditLogEntry({ action: 'Create Company', details: `Created company: ${newCompany.name}` });
    return Promise.resolve(newCompany);
  },
  updateCompany: (id, updates) => {
    const index = mockData.companies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockData.companies[index] = { ...mockData.companies[index], ...updates };
      mockAPI.createAuditLogEntry({ action: 'Update Company', details: `Updated company: ${mockData.companies[index].name}` });
      return Promise.resolve(mockData.companies[index]);
    }
    return Promise.reject(new Error('Company not found'));
  },
  deleteCompany: (id) => {
    const index = mockData.companies.findIndex(c => c.id === id);
    if (index !== -1) {
      const deletedCompany = mockData.companies[index];
      mockData.companies.splice(index, 1);
      mockAPI.createAuditLogEntry({ action: 'Delete Company', details: `Deleted company: ${deletedCompany.name}` });
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Company not found'));
  },

  getDepartments: () => Promise.resolve(mockData.departments),
  getDepartment: (id) => Promise.resolve(mockData.departments.find(d => d.id === id)),
  createDepartment: (department) => {
    const newDepartment = { ...department, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    mockAPI.createAuditLogEntry({ action: 'Create Department', details: `Created department: ${newDepartment.name}` });
    return Promise.resolve(newDepartment);
  },
  updateDepartment: (id, updates) => {
    const index = mockData.departments.findIndex(d => d.id === id);
    if (index !== -1) {
      mockData.departments[index] = { ...mockData.departments[index], ...updates };
      mockAPI.createAuditLogEntry({ action: 'Update Department', details: `Updated department: ${mockData.departments[index].name}` });
      return Promise.resolve(mockData.departments[index]);
    }
    return Promise.reject(new Error('Department not found'));
  },
  deleteDepartment: (id) => {
    const index = mockData.departments.findIndex(d => d.id === id);
    if (index !== -1) {
      const deletedDepartment = mockData.departments[index];
      mockData.departments.splice(index, 1);
      mockAPI.createAuditLogEntry({ action: 'Delete Department', details: `Deleted department: ${deletedDepartment.name}` });
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Department not found'));
  },

  getEmployees: () => Promise.resolve(mockData.employees),
  getEmployee: (id) => Promise.resolve(mockData.employees.find(e => e.id === id)),
  createEmployee: (employee) => {
    const newEmployee = { ...employee, id: Date.now() };
    mockAPI.createAuditLogEntry({ action: 'Create Employee', details: `Created employee: ${newEmployee.firstName} ${newEmployee.lastName}` });
    return Promise.resolve(newEmployee);
  },
  updateEmployee: (id, updates) => {
    const index = mockData.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      mockData.employees[index] = { ...mockData.employees[index], ...updates };
      mockAPI.createAuditLogEntry({ action: 'Update Employee', details: `Updated employee: ${mockData.employees[index].firstName} ${mockData.employees[index].lastName}` });
      return Promise.resolve(mockData.employees[index]);
    }
    return Promise.reject(new Error('Employee not found'));
  },
  deleteEmployee: (id) => {
    const index = mockData.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      const deletedEmployee = mockData.employees[index];
      mockData.employees.splice(index, 1);
      mockAPI.createAuditLogEntry({ action: 'Delete Employee', details: `Deleted employee: ${deletedEmployee.firstName} ${deletedEmployee.lastName}` });
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Employee not found'));
  },

  getAuditLogs: () => Promise.resolve(auditLogDataFromFile.logs),
  createAuditLogEntry: (logEntry) => {
    const authStore = useAuthStore();
    const user = authStore.user;
    const newLog = {
      id: Date.now(),
      user: user ? user.username : 'System',
      ...logEntry,
      timestamp: new Date().toISOString(),
    };
    auditLogDataFromFile.logs.unshift(newLog);
    return Promise.resolve(newLog);
  }
};