<template>
  <v-footer
      dark
      padless
  >
    <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
    >
      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy; {{ new Date().getFullYear() }} — <strong>Ricardo Rossi</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
