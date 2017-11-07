import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Routes from '@/components/Routes'
import CreateRoute from '@/components/CreateRoute'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/routes',
      name: 'route',
      component: Routes
    },
    {
      path: '/routes/create',
      name: 'routes-create',
      component: CreateRoute
    }
  ]
})
