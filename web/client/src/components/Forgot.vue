<template>
    <article>
        <form autocomplete="off">
            <h2>{{ title }}</h2>
            <input type="text" name="nickname_email" :placeholder="nickname_email">
            <button>{{ submit }}</button>
        </form>
    </article>
</template>

<script>
export default {
    name: 'Main',
    data: () => {
        return {
            title: 'Forgot My Password',
            submit: 'Send',
            nickname_email: 'Nickname / Email',
            forgot_password: 'Forgot my password'
        }
    }
}
</script>
