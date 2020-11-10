import Vue from 'vue';
import Router from 'vue-router';
import auth from './middleware/auth';

import Login from '@/components/Login';
import Menu from '@/components/menu/Menu';

import CadastroAula from '@/components/menu/CadastroAula.vue';
import Aulas from '@/components/menu/Aulas.vue';
import Aula from '@/components/menu/Aula.vue';

import CadastroSerie from '@/components/menu/CadastroSerie.vue';
import GerenciarCategoria from '@/components/administrador/GerenciarCategoria.vue';

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
            beforeEnter: auth,
            children: [
                {
                    path: 'aulas/nova',
                    component: CadastroAula
                },
                {
                    path: 'aulas/:id',
                    component: Aula,
                },
                {
                    path: 'aulas',
                    component: Aulas,
                },
                {
                    path: 'series/nova',
                    component: CadastroSerie
                },
                {
                    path: 'gerenciar-categoria',
                    component: GerenciarCategoria
                }
            ]
        }
    ]
});