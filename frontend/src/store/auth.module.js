import AuthService from '../services/auth.service.js';

let user = null;
try {
    user = JSON.parse(localStorage.getItem('user'));
} catch (error) {
    console.log(error);
}
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    actions: {
        login: async ({ commit }, u) => {
            try {
                const response = await AuthService.signin(u);
                commit('loginSuccess', response);
                return response;
            } catch (error) {
                commit('loginFailure');
                throw error;
            }
        },
        logout: ({ commit }) => {
            AuthService.signout();
            commit('logout');
        },
        register: async ({ commit }, u) => {
            try {
                const response = await AuthService.register(u);
                commit('registerSuccess', response.data);
                return response;
            } catch (error) {
                commit('registerFailure');
                throw error;
            }
        },
    },
    mutations: {
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        loginSuccess(state, signinResult) {
            state.status.loggedIn = true;
            state.user = signinResult;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registrationFailure(state) {
            state.status.loggedIn = false;
        },
        registrationSuccess(state) {
            state.status.loggedIn = false;
        },
    },
    namespaced: true,
    state: initialState,
};
