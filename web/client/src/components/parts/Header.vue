<template>
    <header>
        <router-link class="logo" to="/">{{ title }}</router-link>
        <a class="burger">☰</a>
        <input type="checkbox" id="burger">
        <div class="burger_menu" @click="closeMenu">
            <ul class="nav_items">
                <li class="menu_header">Navigation</li>
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
            </ul>
            <ul class="menu_icons">
                <li>
                    <icon icon="telegram" />
                    <a target="_blank" href="https://t.me/sp2il">Telegram</a>
                </li>
                <li>
                    <icon icon="whatsapp" />
                    <a target="_blank" href="https://chat.whatsapp.com/ESwgh2sCisA1JGP8v3WvxZ">Whatsapp</a>
                </li>
                <li>
                    <icon icon="discord" />
                    <a target="_blank" href="https://discord.gg/q6YnHHs">Discord</a>
                </li>
                <li>
                    <icon icon="facebook" />
                    <a target="_blank" href="http://bit.do/sp2fb">Facebook</a>
                </li>
            </ul>
        </div>
        <div class="freinds">
        </div>
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
