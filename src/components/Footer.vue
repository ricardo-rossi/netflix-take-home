<template>
  <v-footer dark padless class="footerBg white--text text-center">
    <v-spacer></v-spacer>
    <v-card-text class="white--text">
      &copy; {{ new Date().getFullYear() }} — <strong>Ricardo Rossi</strong>
      - Take-home Netflix exercise
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
