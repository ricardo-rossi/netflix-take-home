<template>
  <div>
    <nav>
      <v-breadcrumbs :items="navigation" large></v-breadcrumbs>
    </nav>

    <v-row justify="center" class="mb-2">
      <v-card
          max-width="1000"
          width="100%"
          elevation="0"
          outlined
          class="px-10 pb-10"
      >
        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ org.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-data-table
            :must-sort="true"
            sort-by="forks"
            :sort-desc="true"
            :headers="headers"
            :items="org.repos"
            loading-text="Loading..."
            class="elevation-0"
        >
          <template v-slot:item.name="{ item }">
            <span class="text-uppercase font-weight-medium" v-html="item.name"></span>
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
    </v-row>

  </div>
</template>

<script>
import Organization from '@/models/Organization';
import moment from 'moment';

export default {
  name: 'OrgPage',

  props: {
    orgName: {
      type: String,
      required: true,
    }
  },

  data: () => ({
    loading: false,
    org: {},
    headers: [
      {text: 'Repository', value: 'name'},
      {text: 'Popularity', value: 'forks'},
      {text: 'Open Issues', value: 'open_issues_count'},
      {text: 'Watchers', value: 'watchers_count'},
      {text: 'Stargazers', value: 'stargazers_count'},
      {text: 'Language', value: 'language'},
      {text: 'License', value: 'license.spdx_id'},
      {text: 'Updated', value: 'updated_at'},
    ],
  }),

  mounted() {
    const org = new Organization(this.orgName);
    Promise.all([
      org.getInfo(),
      org.getRepos()
    ]).then(([orgInfo, orgRepos]) => {
      this.org = orgInfo;
      this.org.repos = orgRepos;
      console.log(this.org);
    }).catch((err) => {
      // TODO: handle error
      console.log(err);
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
