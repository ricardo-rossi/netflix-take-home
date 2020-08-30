<template>
  <v-card class="overflow-hidden">
    <v-app-bar
        absolute
        shaped
        color="indigo darken-2"
        dark
    >
      <v-toolbar-title>
        <v-icon class="mx-2">mdi-git</v-icon>
        GitHub Browser
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="mx-0" icon @click="toggleTheme">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn class="mx-1" icon @click="toggleRTL">
        <v-icon>mdi-translate</v-icon>
      </v-btn>

    </v-app-bar>
    <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
        height="60"
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

