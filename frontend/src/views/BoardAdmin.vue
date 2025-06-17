<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    data() {
        return {
            content: '',
        };
    },
    async mounted() {
        try {
            const response = await UserService.getAdminContent();
            this.content = response.data;
        } catch (error) {
            this.content = error?.response?.data || error?.message || error.toString();
        }
    },
    name: 'AdminPage',
};
</script>
