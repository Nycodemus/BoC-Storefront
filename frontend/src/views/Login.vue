<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" alt="Profile Picture"/>
      <VeeForm name="form" :validation-schema="schema" @submit="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <Field v-model="user.email" name="email" type="email" clas="form-field"/>
          <ErrorMessage name="email" class="alert alert-danger" role="alert"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field v-model="user.password" name="password" type="password" class="form-control"/>
          <ErrorMessage name="password" class="alert alert-danger" role="alert"/>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
});
</script>

<script>
import User from '../models/user.model';
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate';

export default {
    components: { ErrorMessage, Field, VeeForm },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    data() {
        return {
            loading: false,
            message: '',
            user: new User('', ''),
        };
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            try {
                await this.$store.dispatch('auth/login', this.user);
                this.$router.push('/profile');
            } catch (error) {
                this.loading = false;
                this.message = error?.response?.data?.message || error.toString();
            }
        },
    },
    name: 'LoginPage',
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
