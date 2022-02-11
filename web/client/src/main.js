// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/style.css'
import '@/assets/menu.css'
import {sync} from 'vuex-router-sync'
import store from '@/lib/storage.js'
import BootstrapIcon from '@dvuckovic/vue-bootstrap-icons'
import UserService from '@/services/UserService'

Vue.config.productionTip = false
Vue.component('icon', BootstrapIcon)

sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    mounted () {
        UserService.init()
    }
})
