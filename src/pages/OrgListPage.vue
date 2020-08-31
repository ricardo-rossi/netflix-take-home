<template>
  <div>
    <v-snackbar
        v-model="alert.snackbar"
        :color="alert.color"
        :multi-line="true"
        :timeout="5000"
        :top="true"
    >
      {{ alert.text }}
      <v-btn dark text @click="alert.snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <div class="mb-2 mx-1">
      <v-card max-width="1000" width="100%" elevation="0" outlined>
        <v-card-text class="mx-4 mt-2 pa-4">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-2">
                Connect a GitHub repository
              </v-list-item-title>
              <div class="subtitle-1">
                Enter a valid organization name below. (i.e: Netflix, Uber, Twitter, Facebook, etc...
              </div>
              <v-form @submit.prevent="handleAdd" class="mt-2">
                <v-text-field
                    autofocus
                    label="org-name"
                    v-model="newOrgName"
                    prefix="https://github.com/"
                    prepend-icon="mdi-git"
                    type="text"
                ></v-text-field>
                <v-btn type="submit" class="mr-4 primary">submit</v-btn>
                <v-btn @click="newOrgName = ''">clear</v-btn>
              </v-form>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </div>

    <div class="mx-1 pt-2" v-if="loading">
      <v-skeleton-loader
          class="defaultBg"
          max-width="1000"
          :loading="loading"
          transition="scale-transition"
          elevation="0"
          outlined
          height="160"
          width="100%"
          type="article"
      >
      </v-skeleton-loader>
    </div>

    <div class="mb-2 mx-0">
      <div v-for="org in orgList" :key="org.id">
        <OrgCard :data="org" :onRemove="handleRemove"/>
      </div>
    </div>

    <RateLimitAlert :show="dialog"/>
  </div>
</template>

<script>
import OrgList from '@/models/OrgList';
import OrgCard from '@/components/OrgCard';
import RateLimitAlert from '@/components/RateLimitAlert';

export default {
  name: 'OrgListPage',

  components: {
    RateLimitAlert,
    OrgCard,
  },

  data: () => ({
    loading: false,
    newOrgName: '',
    orgList: [],
    alert: {
      color: '',
      snackbar: false,
      text: '',
    },
    dialog: false,
  }),

  mounted() {
    this.loadList();
  },

  methods: {

    /**
     * Loads the org list
     */
    loadList() {
      this.orgList = OrgList.getList().reverse();
    },

    /**
     * Handles the org add event
     */
    async handleAdd() {
      this.loading = true;
      this.dialog = false;
      const orgName = this.newOrgName.trim();
      this.newOrgName = '';
      try {
        await OrgList.addOrgByName(orgName);
        this.loadList();
        this.alert.text = `The organization ${orgName} has been added!`;
        this.alert.color = 'success';
        this.alert.snackbar = true;
      } catch (err) {
        if (String(err).match(/404/)) {
          this.alert.text = `Couldn't find organization ${orgName}`;
        } else if (String(err).match(/403/)) {
          this.alert.text = `GitHub API rate limit exceeded. Please try again later.`;
          this.dialog = true;
        } else {
          this.alert.text = err;
        }
        this.alert.color = 'error';
        this.alert.snackbar = true;
      }
      this.loading = false;
    },

    /**
     * Handles the org removal event
     *
     * @param orgName
     */
    handleRemove(orgName) {
      this.alert.text = `${orgName} has been successfully removed!`;
      this.alert.color = 'success';
      this.alert.snackbar = true;
      OrgList.remove(orgName);
      this.loadList();
    },
  }
}
</script>
