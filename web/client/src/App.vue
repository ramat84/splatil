<template>
    <div id="app">
        <Header />
        <!-- <video v-if="!logged" autoplay muted loop :src="bgVideo" /> -->
        <transition name="slide">
            <router-view />
        </transition>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/parts/Header'
import Footer from '@/components/parts/Footer'
import Video from '@/assets/sp2.mp4'

export default {
    name: 'App',
    components: { Header, Footer },
    animated: true,
    data: () => {
        return {
            bgVideo: Video
        }
    },
    computed: {
        logged () {
            return this.$store.state.is_logged_in
        }
    }
}
</script>
