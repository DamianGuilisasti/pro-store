import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Admin from '@/views/Admin'
import Home from '@/views/Home'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/Products'
import ProductView from '@/components/ProductView'
import Register from '@/components/Register'
import Login from '@/components/Login'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: '/',
        component: Home,
        name: 'Home'
      },
      {
        path: '/producto',
        component: ProductView,
        name: 'ProductView'
      }
    ]
  },
  {
    path: '/Admin',
    component: Admin,
    name: 'Admin',
    children: [
      {
        path: '/',
        component: Dashboard,
        name: 'Dashboard'
      },
      {
        path: 'products',
        component: Products,
        name: 'Products'
      }
    ]
  },
  {
    path: '/Account',
    component: Layout,
    name: 'Account',
    children: [
      {
        path: 'Register',
        component: Register,
        name: 'Register'
      },
      {
        path: 'Login',
        component: Login,
        name: 'Login'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
