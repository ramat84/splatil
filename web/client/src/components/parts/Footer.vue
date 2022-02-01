<template>
    <footer v-if="logged">
        <div class="welcome_back">Welcome back {{$store.state.nickname}}</div>
        <button @click="logout">
            <icon icon="box-arrow-left" />
            Logout
        </button>
    </footer>
    <footer v-else>
        <button>
            <icon icon="box-arrow-in-right"/>
            <router-link to="login">Login</router-link>
        </button>
        <button>
            <icon icon="person-circle" />
            <router-link to="signup">Sign up</router-link>
        </button>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        logged () {
            return this.$store.state.is_logged_in
        }
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', '')
            this.$router.push('/')
        }
    }
}
</script>
