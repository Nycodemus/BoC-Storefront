<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{ currentUser.username }}'s</strong> Profile
            </h3>
        </header>
        <p>
            <strong>Email:</strong>
            {{currentUser.email}}
        </p>
        <p>
            <strong>Token:</strong>
            {{ currentUser.accessToken.substring(0, 20) }} ...
            {{ currentUser.accessToken.substring(currentUser.accessToken.length - 20) }}
        </p>
        <p>
            <strong>Id:</strong>
            {{ currentUser.id }}
        </p>
        <strong>Authorities:</strong>
        <ul>
            <li v-for="(role,index) in currentUser.roles" :key="index">{{ role }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },
    name: 'ProfilePage',
};
</script>
