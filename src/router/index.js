import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Admin from '@/views/Admin'
import Home from '@/views/Home'
import About from '@/views/About'
import Contact from '@/views/Contact'
import Cart from '@/views/Cart'
import Dashboard from '@/components/Dashboard'
import Orders from '@/components/Orders'
import Products from '@/components/Products'
import Product from '@/views/Product'
import Users from '@/components/Users'
import Clients from '@/components/Clients'
import Reports from '@/components/Reports'
import Customize from '@/components/Customize'
import Settings from '@/components/Settings'
import ProductsAdmin from '@/components/ProductsAdmin'
import AddProductAdmin from '@/components/AddProductAdmin'
import CategoryAdmin from '@/components/CategoryAdmin'
import RegisterClient from '@/components/RegisterClient'
import LoginAdmin from '@/components/LoginAdmin'
import LoginClient from '@/components/LoginClient'
import ErrorPath from '@/components/ErrorPath'
import SocialMedia from '@/components/SocialMedia'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: ErrorPath,
  },
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
        path: '/nosotros',
        component: About,
        name: 'About'
      },
      {
        path: '/productos',
        component: Products,
        name: 'Products'
      },
      {
        path: 'producto/:id',
        component: Product,
        name: 'Product'
      },     
      {
        path: '/contacto',
        component: Contact,
        name: 'Contact'
      }
      ,     
      {
        path: '/carrito',
        component: Cart,
        name: 'Cart'
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    name: 'Admin',
    meta: {
      requiresAuth: true //Falta realizar la lógica de Auth
    },
    children: [
      {
        path: '/',
        component: Dashboard,
        name: 'Dashboard'
      },
      {
        path: 'pedidos',
        component: Orders,
        name: 'Orders'
      },
      {
        path: 'productos',
        component: ProductsAdmin,
        name: 'ProductsAdmin'
      },
      {
        path: 'productos/agregar',
        component: AddProductAdmin,
        name: 'AddProductAdmin'
      },
      {
        path: 'categorias',
        component: CategoryAdmin,
        name: 'CategoryAdmin'
      },
      {
        path: 'clientes',
        component: Clients,
        name: 'Clients'
      },
      {
        path: 'usuarios',
        component: Users,
        name: 'Users'
      },
      {
        path: 'informes',
        component: Reports,
        name: 'Reports'
      },
      {
        path: 'personalizacion',
        component: Customize,
        name: 'Customize'
      },
      {
        path: 'configuracion',
        component: Settings,
        name: 'Settings'
      },
      {
        path: 'configuracion/redes-sociales',
        component: SocialMedia,
        name: 'SocialMedia'
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    name: 'Account',
    children: [
      {
        path: 'register',
        component: RegisterClient,
        name: 'Register'
      },
      {
        path: 'login',
        component: LoginClient,
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
