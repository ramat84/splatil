<template>
    <input :type="type" :name="name" :placeholder="email">
</template>

<script>
export default {
    name: 'CustomInput',
    labels: {
        'type': 'text'
    },
    props: [
        'type',
        'name',
        'placeholder'
    ]
}
</script>
