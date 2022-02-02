<template>
    <article>
        <div class="welcome glass">
                <h2>Welcome to Splatil</h2>
                <h3>We hope you'll enjoy this app</h3>
                <div class="version">Splatil v0.1.1</div>
                <p>In this app you can find friends to play with Splatoon 2 and arrange games to play together. This is an early version with only the basic stuff working, as we go farther in development this will get more rich and will support more features. To help in development, please report bugs and issues <a href="https://github.com/ramat84/splatil/issues">here</a>.</p>
                <img :src="welcomeImage" />
                <div class="links space-top" v-if="!logged">
                    <button>
                        <icon icon="box-arrow-in-right"/>
                        <router-link to="login">Login</router-link>
                    </button>
                    <button>
                        <icon icon="person-circle" />
                        <router-link to="signup">Sign up</router-link>
                    </button>
                </div>
            </div>
    </article>
</template>
<script>
import boyImage from '@/assets/boy.png'

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
    },
    data: () => {
        return {
            welcomeImage: boyImage
        }
    }
}
</script>
