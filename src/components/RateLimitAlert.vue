<template>
  <v-dialog v-if="visible" v-model="visible" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
      >
        GitHub API error.
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        The GitHub API rate has been limit exceeded.
      </v-card-title>
      <v-card-text>
        Please wait a few minutes and try again. We apologize for the inconvenience.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="visible = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RateLimitAlert',

  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data: () => ({
    visible: false,
  }),

  watch: {

    /**
     * Controls the visibility of the modal window
     *
     * @param val
     */
    show(val) {
      this.visible = val;
    }
  }
}
</script>
