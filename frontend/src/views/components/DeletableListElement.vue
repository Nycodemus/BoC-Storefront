<template>
    <Transition name="modal">
        <div v-if="showConfirmation" class="modal-mask" @click="showConfirmation = false">
            <div class="col-md-12 modal-body">
                <div class="modal-container" style="display:block;overflow:auto" @click.stop="">
                    <h3>Are you sure you wish to delete '{{resource.name}}'?</h3>
                    <div style="display:flex;flex-direction:row;justify-content:space-between">
                        <button class="btn btn-primary btn-block btn-delete" @click="deleteResource(resource.id)">Delete</button>
                        <button class="btn btn-secondary btn-block" @click="showConfirmation = false">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    <div class="card card-container">
        <h3>{{ resource.name }}</h3>
        <div>
            <button style="float:right" class="btn btn-primary btn-block btn-delete" @click="showConfirmation = true">
                Delete
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>
import { onUnmounted } from 'vue';

export default {
    data() {
        return {
            showConfirmation: false,
        };
    },
    emits: ['delete'],
    methods: {
        deleteResource(id) {
            this.showConfirmation = false;
            this.$emit('delete', id);
        },
    },
    mounted() {
        const escapeEvent = (e) => e.key === 'Escape' && (this.showConfirmation = false);
        document.addEventListener('keyup', escapeEvent);
        onUnmounted(() => document.removeEventListener('keyup', escapeEvent));
    },
    name: 'DeletableListElement',
    props: {
        resource: {
            required: true,
            type: Object,
        },
    },
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

h3 {
    text-wrap: pretty;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 10px auto 25px;
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

.btn-delete {
    background-color: #d23030;
}

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
