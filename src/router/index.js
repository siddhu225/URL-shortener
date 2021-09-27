import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log(to, from, next);
  if (to.name === 'Home') {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return next({ path: 'Login' });
    }
  }
  next();
});

export default router
