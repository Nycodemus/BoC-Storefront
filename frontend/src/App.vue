<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a href class="navbar-brand" @click.prevent>BOC STOREFRONT</a>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/home" class="nav-link">
                        <font-awesome-icon icon="home"/>
                        Home
                    </router-link>
                </li>
                <li v-if="showAdminBoard" class="nav-item">
                    <router-link to="/admin" class="nav-link">Admin Tools</router-link>
                </li>
                <li v-if="showModeratorBoard" class="nav-item">
                    <router-link to="/mod" class="nav-link">GM Section</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="currentUser" to="/user" class="nav-link">Characters</router-link>
                </li>
            </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt"/>
              Login
          </router-link>
        </li>
      </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                        <font-awesome-icon icon="user"/>
                        {{ currentUser.username }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href @click="logOut">
                        <font-awesome-icon icon="sign-out-alt"/>
                        LogOut
                    </a>
                </li>
                <li class="nav-item">
                    <router-link to="/manufacturers" class="nav-link">
                        <font-awesome-icon icon="user-plus"/>
                        Manufacturers
                    </router-link>
                </li>
            </div>

        </nav>

        <div class="container">
            <RouterView/>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        showAdminBoard() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('admin');
            }

            return false;
        },
        showModeratorBoard() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('gm');
            }

            return false;
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
    },
};
</script>
