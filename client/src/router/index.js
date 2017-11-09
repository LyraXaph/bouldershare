import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Routes from '@/components/Routes/Index'
import CreateRoute from '@/components/CreateRoute'
import ViewProblem from '@/components/ViewProblem'

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
      name: 'routes',
      component: Routes
    },
    {
      path: '/routes/create',
      name: 'routes-create',
      component: CreateRoute
    },
    {
      path: '/problems/:slug',
      name: 'problem',
      component: ViewProblem
    }
  ]
})
