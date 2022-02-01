import axios from 'axios'
import store from '../lib/storage'

export default () => {
    let opts = {
        baseURL: `http://localhost:8081`
    }

    const token = store.state.token

    if (token) {
        opts.Authorization = `Bearer ${token}`
    }

    return axios.create(opts)
}
