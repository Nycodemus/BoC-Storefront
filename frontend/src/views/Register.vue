<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card"
                 alt="Profile Picture"/>
            <VeeForm name="form" :validation-schema="schema" @submit="handleRegister">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <Field v-model="user.username" name="username" type="username"/>
                        <ErrorMessage name="username"/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field v-model="user.email" name="email" type="email"/>
                        <ErrorMessage name="email"/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field v-model="user.password" name="password" type="password" class="form-control"/>
                        <ErrorMessage name="password"/>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
            </VeeForm>

            <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >{{ message }}
            </div>
        </div>
    </div>
</template>

<script setup>
import * as yup from 'yup';
import { ErrorMessage } from 'vee-validate';

const schema = yup.object({
    email: yup.string().email('Must be a valid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    username: yup.string().min(3).max(255).required(),
});
</script>

<script>

import { Field, Form as VeeForm } from 'vee-validate';
import User from '../models/user.model';

export default {
    components: { Field, VeeForm },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    data() {
        return {
            message: '',
            submitted: false,
            successful: false,
            user: new User('', '', ''),
        };
    },
    methods: {
        async handleRegister() {
            this.message = '';
            this.submitted = true;

            try {
                const data = await this.$store.dispatch('auth/register', this.user);
                this.message = data.message;
                this.successful = true;
                this.$router.push('/login');
            } catch (error) {
                this.message = error?.response?.data?.message || error?.message || error.toString();
                this.successful = false;
            }
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    name: 'RegisterPage',
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
