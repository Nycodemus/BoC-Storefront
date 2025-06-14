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
        login: ({ commit }, u) => {
            return AuthService.signin(u).then((response) => {
                commit('loginSuccess', response);
                return Promise.resolve(response);
            }, (error) => {
                commit('loginFailure');
                return Promise.reject(error);
            });
        },
        logout: ({ commit }) => {
            AuthService.signout();
            commit('logout');
        },
        register: ({ commit }, u) => {
            return AuthService.register(u).then((response) => {
                commit('registrationSuccess');
                return Promise.resolve(response.data);
            }, (error) => {
                commit('registrationFailure');
                return Promise.reject(error);
            });
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
