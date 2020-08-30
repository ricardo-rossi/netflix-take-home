import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import App from '@/./App';
import OrgListPage from '@/pages/OrgListPage';
import OrgPage from '@/pages/OrgPage';
import RepoPage from '@/pages/RepoPage';
import NotFoundPage from '@/pages/NotFoundPage';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {path: '/org/:orgId', component: OrgPage, props: true},
        {path: '/org/:orgId/repo/:repoId', component: RepoPage, props: true},
        {path: '/', component: OrgListPage},
        {path: '*', component: NotFoundPage},
    ]
});

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
