<template>
  <div>
    <nav>
      <v-breadcrumbs :items="navigation" large></v-breadcrumbs>
    </nav>

    <v-card
        max-width="1000"
        width="100%"
        elevation="0"
        outlined
        class="px-10"
    >

      <v-card-text class="mt-4 mb-2">
        <h1 class="text-h4">
          {{ org.name }}
          <v-chip color="purple" small class="mr-2" dark>{{ org.public_repos }} public repos</v-chip>
        </h1>
        <div class="subtitle-1">
          <a target="_blank" :href="org.html_url">{{ org.html_url }}</a>
          ({{ org.location }})
          <div>
            {{ org.description }}
          </div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-data-table
          :must-sort="true"
          sort-by="forks"
          :sort-desc="true"
          :headers="headers"
          :items="org.repos"
          loading-text="Loading..."
          class="elevation-0 mt-1"
          style="width: 100%"
      >
        <template v-slot:item.name="{ item }">
            <span class="text-uppercase font-weight-medium">
              <router-link :to="`/org/${org.login.toLowerCase()}/repo/${item.name.toLowerCase()}`">
              {{ item.name }}
              </router-link>
            </span>
        </template>

        <template v-slot:item.forks="{ item }">
          <v-chip :color="colorPopularity(item.forks)" dark>{{ item.forks }}</v-chip>
        </template>

        <template v-slot:item.open_issues_count="{ item }">
          <v-chip :color="colorIssues(item.open_issues_count)" dark>{{ item.open_issues_count }}</v-chip>
        </template>

        <template v-slot:item.watchers_count="{ item }">
          <v-chip :color="colorWatchers(item.watchers_count)" dark>{{ item.watchers_count }}</v-chip>
        </template>

        <template v-slot:item.updated_at="{ item }">
          {{ formatDate(item.updated_at) }}
        </template>

      </v-data-table>

    </v-card>

    <RateLimitAlert :show="dialog"/>
  </div>
</template>

<script>
import Organization from '@/models/Organization';
import RateLimitAlert from '@/components/RateLimitAlert';
import moment from 'moment';

export default {
  name: 'OrgPage',
  components: {
    RateLimitAlert,
  },

  props: {
    orgName: {
      type: String,
      required: true,
    }
  },

  data: () => ({
    loading: false,
    dialog: false,
    org: {},
    headers: [
      {text: 'Repository', value: 'name'},
      {text: 'Popularity', value: 'forks'},
      {text: 'Open Issues', value: 'open_issues_count'},
      {text: 'Watchers', value: 'watchers_count'},
      {text: 'Stars', value: 'stargazers_count'},
      {text: 'Language', value: 'language'},
      {text: 'License', value: 'license.spdx_id'},
      {text: 'Updated', value: 'updated_at'},
    ],
  }),

  mounted() {
    this.dialog = false;
    const org = new Organization(this.orgName);
    Promise.all([
      org.getInfo(),
      org.getRepos()
    ]).then(([orgInfo, orgRepos]) => {
      this.org = orgInfo;
      this.org.repos = orgRepos;
    }).catch((err) => {
      if (String(err).match(/403/)) {
        this.dialog = true;
      } else {
        this.$router.replace('/');
      }
    });
  },

  methods: {
    colorPopularity(forks) {
      if (forks > 1000) return 'green'
      else if (forks > 100) return 'orange'
      else return 'red'
    },
    colorIssues(issues) {
      if (issues > 100) return 'red'
      else if (issues > 500) return 'orange'
      else return ''
    },
    colorWatchers(watchers) {
      if (watchers > 5000) return 'blue'
      else return ''
    },
    formatDate(dt) {
      return moment(dt).fromNow()
    },
  },

  computed: {
    navigation() {
      return [
        {
          text: 'Home',
          href: '#/',
        },
        {
          text: this.org.name,
          disabled: true,
          href: '#',
        },
      ];
    },
  },
}
</script>
