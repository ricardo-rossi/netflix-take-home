import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import App from '@/./App';
import OrgList from '@/pages/OrgList';
import Organization from '@/pages/Organization';
import Repository from '@/pages/Repository';
import NotFound from '@/pages/NotFound';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {path: '/org/:orgId', component: Organization, props: true},
        {path: '/org/:orgId/repo/:repoId', component: Repository, props: true},
        {path: '/', component: OrgList},
        {path: '*', component: NotFound},
    ]
});

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
