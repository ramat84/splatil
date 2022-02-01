<template>
    <header>
        <router-link class="logo" to="/">{{ title }}</router-link>
        <a class="burger">☰</a>
        <input type="checkbox" id="burger">

        <ul class="burger_menu" @click="closeMenu">
            <li>
                <icon icon="house-fill" />
                <router-link to="/">About</router-link>
            </li>
            <li v-if="logged">
                <icon icon="door-open-fill" />
                <router-link to="/rooms">Rooms</router-link>
            </li>
            <li v-if="logged" @click="logout">
                <icon icon="box-arrow-left" />
                Logout
            </li>
            <li v-if="!logged">
                <icon icon="box-arrow-in-right"/>
                <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!logged">
                <icon icon="person-circle" />
                <router-link to="/signup">Signup</router-link>
            </li>
            <li class="separator"> </li>
            <li>
                <icon icon="telegram" />
                <router-link to="/talk">Social</router-link>
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data: () => {
        return {
            title: 'Splatil'
        }
    },

    computed: {
        logged () {
            return this.$store.state.is_logged_in
        }
    },

    methods: {
        logout () {
            this.$store.dispatch('setToken', '')
            this.$router.push('/')
            this.closeMenu()
        },

        closeMenu () {
            let burger = document.querySelector('#burger')

            if (getComputedStyle(burger).display === 'none') {
                return
            }
            burger.click()
        }
    }
}
</script>
