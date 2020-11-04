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
import CategoryAdmin from '@/components/CategoryAdmin'
import RegisterClient from '@/components/RegisterClient'
import LoginAdmin from '@/components/LoginAdmin'
import LoginClient from '@/components/LoginClient'
import ErrorPath from '@/components/ErrorPath'
import SocialMediaAdmin from '@/components/SocialMediaAdmin'
import AboutUsAdmin from '@/components/AboutUsAdmin'
import CatalogAdmin from '@/components/CatalogAdmin'
import store from '../store'


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
        path: 'login',
        component: LoginAdmin,
        name: 'LoginAdmin'
      },
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
      SellerRol: true
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
        name: 'Reports',
        meta: {
          AdminRol: true
        },
      },
      {
        path: 'personalizacion',
        component: Customize,
        name: 'Customize',
        meta: {
          AdminRol: true
        },
      },
      {
        path: 'configuracion',
        component: Settings,
        name: 'Settings',
        meta: {
          AdminRol: true
        },
      },
      {
        path: 'configuracion/redes-sociales',
        component: SocialMediaAdmin,
        name: 'SocialMediaAdmin'
      },
      {
        path: 'configuracion/informacion-nosotros',
        component: AboutUsAdmin,
        name: 'AboutUsAdmin'
      },
      {
        path: 'configuracion/catalogo',
        component: CatalogAdmin,
        name: 'CatalogAdmin'
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

router.beforeEach((to, from, next) => { //to hacia donde quiero ir - from desde donde vengo y next es para que continue haciendo lo que estaba haciendo.
  const rutaProtegida = to.matched.some(record => record.meta.SellerRol);
  if(rutaProtegida && store.state.token === ''){
    next({name: 'LoginAdmin'});
  }
  else{
    next();
  }
  next();
})

export default router
