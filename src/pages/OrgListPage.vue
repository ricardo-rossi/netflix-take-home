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
      <v-card
          max-width="800"
          width="100%"
          elevation="0"
          outlined
      >
        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Add a new repository:
              </v-list-item-title>
              <p>
                Lorem i[sum Lorem i[sumLorem i[sumLorem i[sumLorem i[sumLorem i[sum
                Lorem i[sum Lorem i[sumLorem i[sumLorem i[sumLorem i[sumLorem i[sum
              </p>
              <v-form @submit="handleAdd">
                <v-text-field
                    label="org name"
                    name="org-name"
                    v-model="newOrgName"
                    prefix="https://github.com/"
                    prepend-icon="mdi-git"
                    type="text"
                ></v-text-field>
                <v-btn class="mr-4 primary" @click="handleAdd">submit</v-btn>
                <v-btn @click="newOrgName = ''">clear</v-btn>
              </v-form>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

      </v-card>
    </v-row>

    <v-row justify="center">
      <v-skeleton-loader
          v-if="loading"
          class="mx-auto mb-5 my-4 pa-4"
          max-width="800"
          :loading="loading"
          transition="scale-transition"
          elevation="1"
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

    async handleAdd() {
      this.loading = true;
      const orgName = this.newOrgName.trim();
      this.newOrgName = '';
      try {
        await OrgList.addOrgByName(orgName);
        this.loadList();
        this.alert.text = `${orgName} has been added!`;
        this.alert.color = 'success';
        this.alert.snackbar = true;
      } catch (err) {
        this.alert.text = err;
        this.alert.color = 'error';
        this.alert.snackbar = true;
      }
      this.loading = false;
    },

    /**
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

<style scoped>

</style>