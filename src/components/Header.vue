<template>
  <v-card class="overflow-hidden">
    <v-app-bar fixed color="headerBg" dark flat>
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none">
          <v-icon class="mx-2">mdi-git</v-icon>
          GitHub Browser
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-0" icon @click="toggleTheme" v-bind="attrs" v-on="on">
            <v-icon>mdi-invert-colors</v-icon>
          </v-btn>
        </template>
        <span>Toggle Dark and Light themes</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-1" icon @click="toggleRTL" v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>Toggle RTL orientation</span>
      </v-tooltip>

    </v-app-bar>
    <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
        height="54"
    >
    </v-sheet>
  </v-card>
</template>

<script>
import Model from '@/models/Model';

export default {
  name: 'Header',

  methods: {

    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      Model._save('dark', this.$vuetify.theme.dark);
    },

    toggleRTL() {
      this.$vuetify.rtl = !this.$vuetify.rtl;
      Model._save('rtl', this.$vuetify.rtl);
    },
  }
}
</script>

