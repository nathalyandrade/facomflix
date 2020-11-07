import Vue from 'vue';
import Router from 'vue-router';
import Auth from './middleware/auth';

import Login from '@/components/Login';
import Menu from '@/components/menu/Menu';
import CadastroAula from '@/components/menu/CadastroAula.vue';
import CadastroSerie from '@/components/menu/CadastroSerie.vue';


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
            beforeEnter: Auth,
            children: [
                {
                    path: 'cadastro-aula',
                    component: CadastroAula
                },
                {
                    path: 'cadastro-serie',
                    component: CadastroSerie
                }
            ]
        }
    ]
});