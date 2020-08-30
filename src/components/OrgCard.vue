<template>
  <v-card
      class="mx-auto my-4 pa-4"
      max-width="800"
      outlined
      rounded
      elevation="0"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Open on GitHub
        </div>
        <v-list-item-title class="headline mb-1">
          {{ data.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ data.description }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ data.location }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ data.public_repos }} public repos
          {{ data.url }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="80"
          color="grey"
      >
        <v-img
            height="80"
            width="80"
            :src="data.avatar_url"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions class="py-4">
      <router-link :to="orgUrl">
        <v-btn class="primary ml-3 px-4" text>View Repositories</v-btn>
      </router-link>
      <v-btn class="error ml-3 px-4" text @click="remove">
        Remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'OrgCard',

  props: {
    data: {
      type: Object,
      required: true,
    },
    onRemove: {
      type: Function,
      required: true,
    },
  },

  computed: {
    orgUrl() {
      return `/org/${this.data.id}`;
    }
  },

  methods: {
    remove() {
      this.onRemove(this.data.login);
    }
  },

}
</script>

<style scoped>

</style>