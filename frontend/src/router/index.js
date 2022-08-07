import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  },
  {
    path: '/centrodecustos',
    name: 'centrodecustos',
    component: () => import(/* webpackChunkName: "centrodecustos" */ '../views/centrodecustos/CentroCustosView.vue')
  },
  {
    path: '/departamentos',
    name: 'departamentos',
    component: () => import(/* webpackChunkName: "departamentos" */ '../views/departamentos/DepartamentosView.vue')
  },
  {
    path: '/cargos',
    name: 'cargos',
    component: () => import(/* webpackChunkName: "cargos" */ '../views/cargos/CargosView.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import(/* webpackChunkName: "usuarios" */ '../views/usuarios/UsuariosView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
