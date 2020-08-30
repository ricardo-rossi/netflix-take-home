import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Model from '@/models/Model';
import colors from 'vuetify/lib/util/colors'

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
        themes: {
            light: {
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                mainBg: colors.grey.lighten2,
                footerBg: colors.indigo.darken4,
                headerBg: colors.blue.darken4,
                defaultBg: colors.white,
            },
            dark: {
                primary: colors.blue.lighten1,
                mainBg: colors.grey.darken3,
                footerBg: colors.grey.darken4,
                headerBg: colors.purple.darken4,
                defaultBg: colors.black,
            },
        }
    },
});
