<template>
    <article>
        <h1>Welcome to SplatIL</h1>
        <div>{{ inputval }}</div>
        <input v-model="inputval" placeholder="name">
        <button @click="toggleBox">Toggle</button>
        <div v-if="isVisible" class="box"></div>
    </article>
</template>

<style>
.box { width: 50px; height: 50px; background: green; }
</style>

<script>
export default {
    name: 'Main',
    data: () => { return {
        inputval: ''
    } }
}
</script>
