import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        id: null,
        is_logged_in: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            state.is_logged_in = !!token
            Cookies.set('token', token)
        },

        setUser (state, user) {
            state.nickname = user.nickname
            state.id = user.id
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token)
        },

        setUser ({commit}, user) {
            commit('setUser', user)
        }
    }
})
