import Vue from 'vue'
import Router from 'vue-router'
// 登陆组件
const Login = r => require.ensure([], () => r(require('@page/Login')), 'login')
// 首页组件
const Index = r => require.ensure([], () => r(require('@page/Index')), 'index')
// home组件
const Home = r => require.ensure([], () => r(require('@page/home/Home')), 'page')
const Equips = r => require.ensure([], () => r(require('@page/equips/Equips')), 'page')
const Snapshot = r => require.ensure([], () => r(require('@page/snapshot/Snapshot')), 'page')
const SystemConf = r => require.ensure([], () => r(require('@page/systemConf/SystemConf')), 'page')
const EventQuery = r => require.ensure([], () => r(require('@page/eventQuery/EventQuery')), 'page')
const Schedule = r => require.ensure([], () => r(require('@page/schedule/Schedule')), 'page')
const TimeTask = r => require.ensure([], () => r(require('@page/timeTask/TimeTask')), 'page')
const EquipLinkage = r => require.ensure([], () => r(require('@page/equipLinkage/EquipLinkage')), 'page')

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
          path: 'snapshot',
          component: Snapshot
        },
        {
          path: 'systemConf',
          component: SystemConf
        },
        {
          path: 'eventQuery',
          component: EventQuery
        },
        {
          path: 'schedule',
          component: Schedule
        },
        {
          path: 'timeTask',
          component: TimeTask
        },
        {
          path: 'equipLinkage',
          component: EquipLinkage
        }
        // {
        //   path: '*',
        //   redirect: '/index'
        // }
      ]
    }
    // {
    //   path: '/*',
    //   redirect: '/login'
    // }
  ]
})
