<template>
  <div>
    <div>Organization</div>
    <div>
      org: {{ orgId }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Organization',

  props: {
    orgId: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>