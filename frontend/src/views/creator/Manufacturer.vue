<template>
    <Transition name="modal" @keydown.esc="$emit('close')">
        <div v-if="show" class="modal-mask">
            <div class="card modal-container">
                <h3>Create New Manufacturer</h3>
                <VeeForm name="form" :validation-schema="schema" @submit="createManufacturer">
                    <div class="form-group">
                        <label for="name">Manufacturer Name</label>
                        <div>
                            <Field style="margin-bottom: 10px" v-model="manufacturer.name" name="name" type="name" clas="form-field"/>

                            <ErrorMessage style="text-wrap:nowrap" name="name" class="alert alert-danger" role="alert"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <span>Create</span>
                        </button>
                    </div>
                    <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
                    </div>
                </VeeForm>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import * as yup from 'yup';

defineProps({
    show: Boolean,
});

const schema = yup.object({
    name: yup.string().min(1).max(255).required('Manufacturer name is required'),
});
</script>

<script>
import Manufacturer from '../../models/manufacturer.model.js';
import ManufacturerService from '../../services/manufacturer.service.js';
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate';
import { onUnmounted } from 'vue';

export default {
    components: { ErrorMessage, Field, VeeForm },
    data() {
        return {
            loading: false,
            manufacturer: new Manufacturer('', ''),
            message: '',
        };
    },
    methods: {
        async createManufacturer() {
            this.loading = true;
            try {
                const m = (await ManufacturerService.createManufacturer(this.manufacturer)).data.data;
                this.loading = false;
                this.manufacturer.name = '';
                this.message = '';
                this.$emit('manufacturerCreated', new Manufacturer(m.id, m.name));
                this.$emit('close');
            } catch (error) {
                this.loading = false;
                this.message = error?.response?.data?.message;
            }
        },
    },
    mounted() {
        const escapeEvent = (e) => e.key === 'Escape' && (this.$emit('close'));
        document.addEventListener('keyup', escapeEvent);
        onUnmounted(() => document.removeEventListener('keyup', escapeEvent));
    },
    name: 'CreateManufacturer',
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

.form-group {
    margin-top: 10px;
    margin-bottom: 10px;
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

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
