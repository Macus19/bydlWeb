import Vue from 'vue'
import Router from 'vue-router'
import Frame from '../components/Frame/Frame'
import Login from '../components/Login/Login'
import CeremonySignUp from '../components/CeremonySignUp/CeremonySignUp'
import UserManage from '../components/UserManage/UserManage'

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
          path: '/CeremonySignUp',
          name: 'CeremonySignUp',
          component: CeremonySignUp
        },
        {
          path: '/UserManage',
          name: 'UserManage',
          component: UserManage
        }
      ]
    }
  ]
})
