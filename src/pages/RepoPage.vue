<template>
  <div>
    <nav>
      <v-breadcrumbs :items="navigation" large></v-breadcrumbs>
    </nav>
    <div class="mb-2">
      <v-card
          max-width="1000"
          width="100%"
          elevation="0"
          outlined
          class="px-10 pb-10"
      >
        <v-card-text class="mt-4 mb-2">
          <h1 class="text-h4">
            {{ repo.full_name }}
          </h1>
          <div class="subtitle-2">
            <a target="_blank" :href="repo.html_url">{{ repo.html_url }}</a>
          </div>
          <div class="subtitle-1 mt-2">
            <v-chip color="green" small class="mr-2" dark>{{ repo.forks_count }} Forks</v-chip>
            <v-chip color="blue" small class="mr-2" dark>{{ repo.stargazers_count }} Stars</v-chip>
            <v-chip color="purple" small class="mr-2" dark>{{ repo.watchers_count }} Watchers</v-chip>
            <v-chip color="red" small class="mr-2" dark>{{ repo.open_issues_count }} Open Issues</v-chip>
          </div>
          <div class="subtitle-1 mt-2">
            {{ repo.description }}
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <template>
          <v-tabs class="mb-5 mt-6 ml-0 pl-0">
            <v-tab class="text-capitalize" @click="setType(typeEnum.commit)">
              Commits
            </v-tab>
            <v-tab class="text-capitalize" @click="setType(typeEnum.branch)">
              Branches
            </v-tab>
            <v-tab class="text-capitalize" @click="setType(typeEnum.contrib)">
              Contributors
            </v-tab>
          </v-tabs>
        </template>

        <v-data-table
            :must-sort="true"
            :headers="headers()"
            :items="data"
            :sort-by="sortColumn"
            :sort-desc="true"
            loading-text="Loading..."
            class="elevation-0"
            style="width: 100%"
        >
          <template v-slot:item.author.avatar_url="{ item }">
            <span
                v-html="showAvatar(item.author.avatar_url)"
                v-if="item.author && item.author.avatar_url">
            </span>
          </template>

          <template v-slot:item.avatar_url="{ item }">
            <span
                v-html="showAvatar(item.avatar_url)"
                v-if="item.avatar_url">
            </span>
          </template>

          <template v-slot:item.commit.author.date="{ item }">
            {{ formatDate(item) }}
          </template>

          <template v-slot:item.commit.message="{ item }">
            <span class="message-cell" v-if="item.commit && item.commit.message">
              {{ item.commit.message.substr(0, 60) }}
            </span>
          </template>

          <template v-slot:item.sha="{ item }">
            <a target="_blank" :href="getCommitURL(item.sha)" v-if="item && item.sha">
              {{ item.sha.substr(0, 7) }}
            </a>
          </template>

          <template v-slot:item.html_url="{ item }">
            <a target="_blank" :href="item.html_url" v-if="item && item.html_url">
              {{ item.html_url }}
            </a>
          </template>

          <template v-slot:item.commit.sha="{ item }">
            <a target="_blank"
               :href="getCommitURL(item.commit.sha)"
               v-if="item && item.commit">
              {{ item.commit.sha }}
            </a>
          </template>

        </v-data-table>

      </v-card>
    </div>

    <RateLimitAlert :show="dialog"/>

  </div>
</template>

<script>
import Repository from '@/models/Repository';
import RateLimitAlert from '@/components/RateLimitAlert';
import moment from 'moment';

export default {
  name: 'RepoPage',
  components: {RateLimitAlert},
  props: {
    orgName: {
      type: String,
      required: true,
    },
    repoName: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    typeEnum: {
      commit: 'COMMIT',
      branch: 'BRANCH',
      contrib: 'CONTRIB',
    },
    type: null,
    sortColumn: null,
    repo: {},
    data: [],
    commitHeaders: [
      {text: 'Date', value: 'commit.author.date'},
      {text: 'Avatar', value: 'author.avatar_url'},
      {text: 'Author', value: 'commit.author.name'},
      {text: 'Message', value: 'commit.message'},
      {text: 'Link', value: 'sha'},
    ],
    branchHeaders: [
      {text: 'Branch Name', value: 'name'},
      {text: 'Last Commit', value: 'commit.sha'},
    ],
    contribHeaders: [
      {text: 'Contributions', value: 'contributions'},
      {text: 'Avatar', value: 'avatar_url'},
      {text: 'Username', value: 'login'},
      {text: 'Profile', value: 'html_url'},
    ],
    dialog: false,
  }),

  mounted() {
    this.type = this.typeEnum.commit;
    this.loadData();
  },

  methods: {

    setType(type) {
      this.type = type;
      this.loadData();
    },

    formatDate(item) {
      if (item.commit && item.commit.author && item.commit.author.date) {
        return moment(item.commit.author.date).fromNow();
      }
      return '';
    },

    getCommitURL(sha) {
      return `https://github.com/${this.orgName}/${this.repoName}/commit/${sha}`;
    },

    showAvatar(avatar_url) {
      if (avatar_url) {
        return `<img alt="Author" width="32" height="32" src=${avatar_url}/>`;
      }
      return '';
    },

    headers() {
      let _headers;
      switch (this.type) {
        case this.typeEnum.commit:
          _headers = this.commitHeaders;
          this.sortColumn = 'commit.author.date';
          break;
        case this.typeEnum.branch:
          _headers = this.branchHeaders;
          break;
        case this.typeEnum.contrib:
          _headers = this.contribHeaders;
          this.sortColumn = 'contributions';
          break;
      }
      return _headers;
    },

    async loadData() {
      this.dialog = false;
      const repo = new Repository(this.orgName, this.repoName);
      try {
        this.repo = await repo.getInfo();
        switch (this.type) {
          case this.typeEnum.commit:
            this.data = await repo.getCommits();
            break;
          case this.typeEnum.branch:
            this.data = await repo.getBranches();
            break;
          case this.typeEnum.contrib:
            this.data = await repo.getContributors();
            break;
          default:
            this.data = await repo.getCommits();
        }
      } catch (err) {
        if (String(err).match(/403/)) {
          this.dialog = true;
        } else {
          await this.$router.replace('/');
        }
      }
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
          text: this.orgName,
          href: `#/org/${this.orgName}`,
        },
        {
          text: this.repo.name,
          disabled: true,
          href: '#',
        },
      ];
    },
  },

}
</script>

<style>
.message-cell {
  text-overflow: ellipsis;
}
</style>