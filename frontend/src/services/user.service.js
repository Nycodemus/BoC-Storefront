import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test';

class UserService {
    getPublicContent() {
        return axios.get(`${API_URL}/public`);
    }

    getUserContent() {
        return axios.get(`${API_URL}/user`, { headers: authHeader() });
    }

    getGmContent() {
        return axios.get(`${API_URL}/gm`, { headers: authHeader() });
    }

    getAdminContent() {
        return axios.get(`${API_URL}/admin`, { headers: authHeader() });
    }
}

export default new UserService();
