<template>
    <div class="col-md-12">
        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
        <button style="display:flex;align-items: center;margin-left:auto;margin-right:auto;margin-top:15px" class="btn btn-primary btn-block"
                @click="showModal = true">
            <h3>New Manufacturer</h3>
        </button>

        <Teleport to="body">
            <CreateManufacturer :show="showModal" @close="showModal = false" @manufacturerCreated="manufacturerCreated">
            </CreateManufacturer>
        </Teleport>
        <DeletableListElement v-for="(m, i) in manufacturers" :key="i" :resource="m" @delete="deleteManufacturer"/>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import DeletableListElement from '../components/DeletableListElement.vue';

const showModal = ref(false);
</script>

<script>
import Manufacturer from '../../models/manufacturer.model.js';
import ManufacturerService from '../../services/manufacturer.service.js';
import CreateManufacturer from '../creator/Manufacturer.vue';

export default {
    components: {CreateManufacturer},
    data() {
        return {
            content: '',
            error: '',
            loading: false,
            manufacturers: [],
        };
    },
    methods: {
        async deleteManufacturer(id) {
            try {
                await ManufacturerService.deleteManufacturer(id);
                this.manufacturers = this.manufacturers.filter((m) => m.id !== id);
            } catch (error) {
                this.error = error?.response?.data?.message || error?.message || error.toString();
            }
        },
        manufacturerCreated(manufacturer) {
            this.manufacturers.push(manufacturer);
            this.manufacturers = this.manufacturers
                .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
        },
    },
    async mounted() {
        try {
            const response = await ManufacturerService.getAllManufacturers();
            const rawManufacturers = response.data?.data;

            if (rawManufacturers && rawManufacturers.length > 0) {
                this.manufacturers = rawManufacturers
                    .map((m) => new Manufacturer(m.id, m.name))
                    .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
            }
        } catch (error) {
            this.content = error?.response?.data?.message || error?.message || error.toString();
        }
    },
    name: 'ViewManufacturers',
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
</style>
