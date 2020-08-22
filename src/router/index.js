import Vue from 'vue'
import Router from 'vue-router'
import Frame from '../components/Frame/Frame'
import Login from '../components/Login/Login'
import CeremonySignUp from '../components/CeremonySignUp/CeremonySignUp'
import OnSiteManage from '../components/OnSiteManage/OnSiteManage'
import UserManage from '../components/UserManage/UserManage'
import MiniProgramSetting from '../components/MiniProgramSetting/MiniProgramSetting'
import BackgroundSystemSetting from '../components/BackgroungSystemSetting/BackgroungSystemSetting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Frame',
      component: Frame,
      children: [
        {
          path: '/',
          name: 'Login',
          component: Login
        },
        {
          path: '/OnSiteManage',
          name: 'OnSiteManage',
          component: OnSiteManage
        },
        {
          path: '/CeremonySignUp',
          name: 'CeremonySignUp',
          component: CeremonySignUp
        },
        {
          path: '/UserManage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: '/MiniProgramSetting',
          name: 'MiniProgramSetting',
          component: MiniProgramSetting
        },
        {
          path: '/BackgroundSystemSetting',
          name: 'BackgroundSystemSetting',
          component: BackgroundSystemSetting
        }
      ]
    }
  ]
})
