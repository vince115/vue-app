import { createRouter, createWebHistory } from 'vue-router';
import StaffList from '../views/StaffList.vue'; // 員工列表頁面
import CreateStaff from '../views/CreateStaff.vue'; // 新增員工頁面

const routes = [
  { path: '/', name: 'StaffList', component: StaffList },
  { path: '/create-staff', name: 'CreateStaff', component: CreateStaff },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
