import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login';
import Menu from '@/components/menu/Menu';

import auth from './middleware/auth';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            component: Menu,
            beforeEnter: auth
        }
    ]
});