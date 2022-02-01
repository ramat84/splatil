<template>
    <article>
        <form @submit.prevent="login" autocomplete="off">
            <h1>
                <icon icon="box-arrow-in-right"/>
                {{ title }}
            </h1>
            <input v-model="nickname_email" type="text" name="nickname_email" placeholder=" ">
            <label>
                <icon icon="person"/>
                {{nickname_emailLabel}}
            </label>
            <input v-model="password" type="password" name="password" placeholder=" ">
            <label>
                <icon icon="asterisk"/>
                {{passwordLabel}}
            </label>
            <button>{{ submit }}</button>
            <button v-if="false" class="btn-gray btn-small"><router-link to="forgot">{{ forgot_password }}</router-link></button>
            <div class="error" v-if="error" v-html="error"></div>
        </form>
    </article>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'Main',
    data: () => {
        return {
            title: 'Login',
            submit: 'Login',
            nickname_emailLabel: 'Nickname / Email',
            passwordLabel: 'Password',
            forgot_password: 'Forgot my password',
            nickname_email: '',
            password: '',
            error: null
        }
    },

    methods: {
        async login () {
            let response

            try {
                response = await UserService.login({
                    user: this.nickname_email,
                    password: this.password
                })
                this.error = null
            } catch (error) {
                this.error = error.response.data.error
            }

            if (this.error) {
                return false
            }

            this.$store.dispatch('setToken', response.data.token)
            this.$store.dispatch('setUser', response.data)

            this.$router.push('/success')
        },
        clearError () {
            this.error = null
        }
    }
}
</script>
