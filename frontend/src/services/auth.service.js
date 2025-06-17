import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    async signin(user) {
        const response = await axios.post(`${API_URL}/signin`, {
            email: user.email,
            password: user.password,
            username: user.username,
        });

        const { data } = response;
        if (data.accessToken) {
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
    }

    signout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(`${API_URL}/signup`, {
            email: user.email,
            password: user.password,
            username: user.username,
        });
    }
}

export default new AuthService();
