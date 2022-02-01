<template>
    <article>
        <form @submit.prevent="signup" autocomplete="off">
            <h1>
                <icon icon="person-circle" />
                {{ title }}
            </h1>
            <input required @focus="clearError" v-model="email" type="email" name="email" placeholder="" />
            <label>
                <icon icon="envelope"/>
                {{email_label}}
            </label>
            <input required @focus="clearError" v-model="nickname" type="text" name="nickname" placeholder="" />
            <label>
                <icon icon="person"/>
                {{nickname_label}}
            </label>
            <input required @focus="clearError" v-model="password" type="password" name="password" placeholder="" />
            <label>
                <icon icon="asterisk"/>
                {{password_label}}
            </label>
            <button>{{ submit }}</button>
            <div class="error" v-if="error" v-html="error"></div>
        </form>
    </article>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'Signup',
    data: () => {
        return {
            email: '',
            nickname: '',
            password: '',
            title: 'Signup',
            submit: 'Signup',
            nickname_label: 'Nickname',
            email_label: 'Email',
            password_label: 'Password',
            error: null
        }
    },
    methods: {
        async signup () {
            let response

            try {
                response = await UserService.register({
                    email: this.email,
                    password: this.password,
                    nickname: this.nickname
                })
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
