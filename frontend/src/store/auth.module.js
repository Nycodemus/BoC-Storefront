import AuthService from "../services/auth.service.js";

let user = null;
try {
    user = JSON.parse(localStorage.getItem("user"))
} catch (error) {
    console.log(error);
}
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login: ({commit}, user) => {
            return AuthService.signin(user).then(user => {
                commit("loginSuccess", user);
                return Promise.resolve(user);
            }, error => {
                commit("loginFailure");
                return Promise.reject(error);
            });
        },
        logout: ({commit}) => {
            AuthService.signout();
            commit("logout");
        },
        register: ({commit}, user) => {
            return AuthService.register(user).then(response => {
                commit("registrationSuccess");
                return Promise.resolve(response.data);
            }, error => {
                commit("registrationFailure");
                return Promise.reject(error);
            });
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registrationSuccess(state) {
            state.status.loggedIn = false;
        },
        registrationFailure(state) {
            state.status.loggedIn = false;
        }
    }
};
