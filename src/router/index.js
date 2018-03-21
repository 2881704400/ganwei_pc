import Vue from 'vue'
import Router from 'vue-router'
// 登陆组件
const Login = r => require.ensure([], () => r(require('@page/Login')), 'login')
// 首页组件
const Index = r => require.ensure([], () => r(require('@page/Index')), 'index')
// home组件
const Home = r => require.ensure([], () => r(require('@page/home/Home')), 'page')
const Equips = r => require.ensure([], () => r(require('@page/equips/Equips')), 'page')
const b = r => require.ensure([], () => r(require('@page/b/b')), 'a')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: Home
        },
        {
          path: 'equips',
          component: Equips
        },
        {
          path: 'b',
          component: b
        },
        {
          path: '*',
          redirect: '/index'
        }
      ]
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})
