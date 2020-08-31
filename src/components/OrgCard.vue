<template>
  <v-card
      class="mx-1 mb-2 pa-4"
      max-width="1000"
      outline
      rounded
      elevation="0"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-card-text class="mb-2" style="width: 100%">
          <h1 class="text-h4">
            {{ data.name }}
            <v-chip color="purple" small class="mr-2" dark>
              {{ data.public_repos }} public repos
            </v-chip>
          </h1>
          <div class="subtitle-1">
            <a target="_blank" :href="data.html_url">{{ data.html_url }}</a>
            ({{ data.location }})
            <div>
              {{ data.description }}
            </div>
          </div>
        </v-card-text>
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

    /**
     * Helper method for routing
     *
     * @return {string}
     */
    orgUrl() {
      return `/org/${this.data.login.toLowerCase()}`;
    }
  },

  methods: {

    /**
     * Removes the given org by invoking referenced onRemove method
     */
    remove() {
      this.onRemove(this.data.login);
    }
  },
}
</script>
