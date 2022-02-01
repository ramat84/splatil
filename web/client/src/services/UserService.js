import Api from '@/services/Api'
import store from '../lib/storage'
import Router from 'vue-router'
import Cookies from 'js-cookie'

async function SendRequest (url, creds) {
    document.body.classList.add('loading')

    let response
    try {
        response = await Api().post(url, creds)
    } catch (err) {
        setTimeout(() => document.body.classList.remove('loading'), 1000)
        throw err
    }

    setTimeout(() => document.body.classList.remove('loading'), 1000)

    return response
}

export default {
    async init () {
        if (store.state.token) {
            return
        }

        const token = Cookies.get('token')
        if (!token) {
            return
        }

        try {
            const response = await SendRequest('verify', {token: token})
            if (!response) {
                return false
            }
            store.dispatch('setToken', response.data.token)
            store.dispatch('setUser', response.data)
        } catch (err) {
            console.log(err)
            return false
        }
    },

    register (creds) {
        return SendRequest('register', creds)
    },

    login (creds) {
        return SendRequest('login', creds)
    },

    checkLogin (to, from, next) {
        if (!(store.state.token)) {
            return new Router().push('/login')
        }
        next()
    },

    getUserId () {
        return store.state.id
    }
}
