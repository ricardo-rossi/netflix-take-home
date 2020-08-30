import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Model from '@/models/Model';

Vue.use(Vuetify);

const rtl = Model._get('rtl');
let dark = Model._get('dark');
if (dark === null) {
    dark = true;
}

export default new Vuetify({
    rtl,
    theme: {
        dark,
    },
});
