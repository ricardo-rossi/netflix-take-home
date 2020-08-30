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
      <v-btn
          dark
          text
          @click="alert.snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-row justify="center">
      <h1>GitHub Organizations</h1>
    </v-row>
    <v-row justify="center">
      <v-card
          class="mx-auto mb-5"
          max-width="800"
          width="100%"
          elevation="0"
      >
        <v-card-text>
          <v-form @submit="submit">
            <v-text-field
                label="Organization's name"
                name="org-name"
                v-model="newOrgName"
                prefix="https://github.com/"
                prepend-icon="mdi-xml"
                type="text"
            ></v-text-field>
            <v-btn class="mr-4 primary" @click="submit">submit</v-btn>
            <v-btn @click="newOrgName = ''">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-skeleton-loader
          v-if="loading"
          class="mx-auto mb-5"
          max-width="800"
          :loading="loading"
          transition="scale-transition"
          elevation="4"
          height="160"
          width="100%"
          type="article"
      >
      </v-skeleton-loader>
    </v-row>

    <v-row justify="center">
      <div v-for="org in orgList" :key="org.id">
        <OrgCard :data="org" :onRemove="handleRemove"/>
      </div>
    </v-row>

  </div>
</template>

<script>
import OrgList from '@/models/OrgList';
import OrgCard from '@/components/OrgCard';

export default {
  name: 'OrgListPage',

  components: {
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
    }
  }),

  mounted() {
    this.loadList();
  },

  methods: {
    loadList() {
      this.orgList = OrgList.getList().reverse();
    },
    async submit() {
      this.loading = true;
      const orgName = this.newOrgName.trim();
      this.newOrgName = '';
      try {
        await OrgList.addOrgByName(orgName);
        this.loadList();
      } catch (err) {
        this.alert.text = err;
        this.alert.snackbar = true;
      }
      this.loading = false;
    },
    handleRemove(orgName) {
      console.log('on remove ', orgName);
      OrgList.remove(orgName);
      this.loadList();
    },
  }
}
</script>

<style scoped>

</style>