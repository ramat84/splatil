import Vue from 'vue'
import Router from 'vue-router'
import UserService from '@/services/UserService'

import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Forgot from '@/components/Forgot'
import Success from '@/components/Success'
import Welcome from '@/components/Welcome'

import Rooms from '@/components/Rooms'
import AddRoom from '@/components/AddRoom'
import RoomSuccess from '@/components/RoomSuccess'

import Talk from '@/components/Talk'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/signup', name: 'signup', component: Signup },
        { path: '/login', name: 'login', component: Login },
        { path: '/forgot', name: 'forgot', component: Forgot },
        { path: '/success', name: 'success', component: Success },

        { path: '/rooms', beforeEnter: UserService.checkLogin, name: 'rooms', component: Rooms },
        { path: '/addroom', beforeEnter: UserService.checkLogin, name: 'addroom', component: AddRoom },
        { path: '/room-success', beforeEnter: UserService.checkLogin, name: 'room-success', component: RoomSuccess },

        { path: '/talk', name: 'talk', component: Talk }
    ]
})
