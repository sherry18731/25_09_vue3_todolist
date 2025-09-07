import { createRouter, createWebHistory } from 'vue-router'

import SignUpPage from '@/views/RegisterView.vue'
import LoginPage from '@/views/LoginView.vue'
import TodoList from '@/views/TodoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' }, // 設定預設路徑
    {
      path: '/todolist',
      name: 'todolist',
      meta: { requiresAuth: true, title: 'Todo List' },
      component: TodoList,
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登入' },
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: '註冊' },
      component: SignUpPage,
    }
  ],
})

// 每次路由改變時修改 title
router.afterEach((to) => {
  document.title = to.meta.title || 'Online Todo List'
})

// 導航守衛
router.beforeEach((to, from, next) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )

  if (to.meta.requiresAuth && !token) {
    next("/login");  // 未登入導向 login
  } else if ((to.path === "/login" || to.path === "/register") && token) {
    next("/todolist") // 已登入直接到至 todoList
  } else {
    next(); // 通過驗證
  }
});

export default router
