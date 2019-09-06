import Vue from 'vue'
import Router from 'vue-router'
import Repair from '@/pages/Repair'
import Evaluate from '@/pages/Evaluate'
import Details from '@/pages/Details'
import Score from '@/pages/Score'
import Success from '@/pages/Success'
import Personal from '@/pages/Personal'
import Assign from '@/pages/Assign'
import AlreadyAssign from '@/pages/Already_Assign'
import Receipt from '@/pages/Receipt'
import State from '@/pages/State'
import Statistics from '@/pages/Statistics'
import Essential from '@/pages/essential'
import StatePlant from '@/pages/StatePlant'
import Connect from '@/pages/Connect'
import Completed from '@/components/Completed'
import NotCompleted from '@/components/NotCompleted'
import StartAssign from '@/pages/StartAssign'
import StartState from '@/pages/StartState'
import statePlantJump from '@/pages/statePlant_jump'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 我要报修
      path: '/repair',
      name: 'Repair',
      component: Repair
    },
    {
      //服务评价
      path: '/evaluate',
      name: 'Evaluate',
      component: Evaluate
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/score',
      name: 'Score',
      component: Score
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      //个人中心-----基本信息填写
      path: '/essential',
      name: 'Essential',
      component: Essential
    },
    {
      //个人中心------工单指派
      path: '/assign',
      name: 'Assign',
      component: Assign
    },
    {
      // 维修单详情页面
      path: '/alreadyAssign',
      name: 'AlreadyAssign',
      component: AlreadyAssign
    },
    {
      // 指派维修人员详情页面
      path: '/startAssign',
      name: 'StartAssign',
      component: StartAssign
    },
    {
      //个人中心------确认接单------页面暂且取消不需要
      path: '/receipt',
      name: 'Receipt',
      component: Receipt
    },
    {
      //个人中心------开始设置维修处理状态
      path: '/startState',
      name: 'StartState',
      component: StartState
    },
    {
      //个人中心------维修处理
      path: '/state',
      name: 'State',
      component: State
    },
    {
      //个人中心------与厂家交接
      path: '/connect',
      name: 'Connect',
      component: Connect
    },
    {
      //个人中心------维修单已完成页面
      path: '/completed',
      name: 'Completed',
      component: Completed
    },
    {
      //个人中心------维修单未完成页面
      path: '/notcompleted',
      name: 'NotCompleted',
      component: NotCompleted
    },
    {
      //个人中心------维修处理(原厂)
      path: '/statePlant',
      name: 'StatePlant',
      component: StatePlant
    },
    {
      //个人中心------维修处理(原厂) 跳转填写
      path: '/statePlant_jump',
      name: 'StatePlantJump',
      component: statePlantJump
    },
    {
      //统计
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    },
  ]
})
