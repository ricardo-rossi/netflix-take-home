<template>
  <div>
    {{ org.login }}
  </div>
</template>

<script>
import Organization from "@/models/Organization";
import OrgList from "@/models/OrgList";

export default {
  name: "Test",

  data: () => {
    return {
      org: {
        repos: []
      }
    };
  },

  mounted() {
    const orgName = 'endata-corp';
    // const orgName = 'Netflix';
    const org = new Organization(orgName);
    Promise.all([
      org.getInfo(),
      org.getRepos()
    ]).then(([orgInfo, orgRepos]) => {
      this.org = orgInfo;
      this.org.repos = orgRepos;
      const list = new OrgList();
      if (!list.hasOrg(orgName)) {
        return list.add(orgInfo);
      }
    }).catch((err) => {
      console.error(err);
    });
  }
}
</script>

<style scoped>

</style>