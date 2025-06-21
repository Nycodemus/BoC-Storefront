import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/manufacturer';

class ManufacturerService {
    async getAllManufacturers() {
        return await axios.get(API_URL, { headers: authHeader() });
    };

    async createManufacturer(manufacturer) {
        return await axios.post(API_URL, {
            name: manufacturer.name,
        }, { headers: authHeader() });
    }

    async getManufacturer(id) {
        return await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    }

    async updateManufacturer(manufacturer) {
        return await axios.put(`${API_URL}/${manufacturer.id}`, {
            name: manufacturer.name,
        }, { headers: authHeader() });
    }

    async deleteManufacturer(id) {
        return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    }
}

export default new ManufacturerService();
