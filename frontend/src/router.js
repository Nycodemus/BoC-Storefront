import { createMemoryHistory, createRouter } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            component: Home,
            name: 'home',
            path: '/',
        },
        {
            component: Home,
            path: '/home',
        },
        {
            component: Login,
            path: '/login',
        },
        {
            component: () => import('./views/Profile.vue'),
            name: 'profile',
            // lazy-loaded
            path: '/profile',
        },
        {
            component: () => import('./views/BoardAdmin.vue'),
            name: 'admin',
            // lazy-loaded
            path: '/admin',
        },
        {
            component: () => import('./views/BoardGm.vue'),
            name: 'gm',
            // lazy-loaded
            path: '/gm',
        },
        {
            component: () => import('./views/BoardUser.vue'),
            name: 'user',
            // lazy-loaded
            path: '/user',
        },
        {
            component: () => import('./views/creator/Manufacturer.vue'),
            name: 'create-manufacturer',
            path: '/create-manufacturer',
        },
        {
            component: () => import('./views/listings/Manufacturer.vue'),
            name: 'manufacturers',
            path: '/manufacturers',
        },
    ],
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export { router };
