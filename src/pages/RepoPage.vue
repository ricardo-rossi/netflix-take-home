<template>
  <div>
    <nav>
      <v-breadcrumbs :items="navigation" large></v-breadcrumbs>
    </nav>
    <div>Repository</div>
    <div>
      org: {{ orgId }}
    </div>
    <div>
      repo: {{ repoId }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoPage',

  props: {
    orgId: {
      type: String,
      required: true,
    },
    repoId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    organization: {
      id: null,
    },
  }),

  mounted() {
    this.organization.id = this.orgId;
  },

  computed: {
    navigation() {
      return [
        {
          text: 'Home',
          href: '#/',
        },
        {
          text: 'Netflix',
          href: `#/org/${this.orgId}`,
        },
        {
          text: 'Repository Name',
          disabled: true,
          href: '#',
        },
      ];
    },
  },

}
</script>

<style scoped>

</style>