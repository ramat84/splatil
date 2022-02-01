import Api from '@/services/Api'
import store from '../lib/storage'

async function sendRequest (type, url, params, succesCallback, errorCallback) {
    try {
        const api = await Api()
        if (store.state.is_logged_in) {
            params.token = store.state.token
        }

        if (!params.skip_loading) {
            document.body.classList.add('loading')
        }

        let response
        try {
            response = await api[type](url, params)
        } catch (err) {
            setTimeout(() => document.body.classList.remove('loading'), 1000)
            throw err
        }

        setTimeout(() => document.body.classList.remove('loading'), 1000)

        if (succesCallback) {
            succesCallback(response.data)
        }
        return response.data
    } catch (err) {
        if (errorCallback) {
            errorCallback(err)
        } else {
            throw err
        }
    }
}

export default {
    recent () {
        const data = sendRequest('get', 'rooms', {})
        return data
    },

    modes () {
        const data = sendRequest('get', 'modes', {})
        return data
    },

    createRoom (reqData) {
        const data = sendRequest('post', 'room', reqData)
        return data
    },

    enterRoom (roomId, successCallback, errorCallback) {
        sendRequest('post', 'room/enter/' + roomId, {}, successCallback, errorCallback)
    },

    exitRoom (roomId, successCallback, errorCallback) {
        sendRequest('post', 'room/exit/' + roomId, {}, successCallback, errorCallback)
    },

    getVersion () {
        try {
            return sendRequest('get', 'static/room_version.json', {skip_loading: true})
        } catch (err) {
            return 0
        }
    }
}
