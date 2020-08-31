<template>
  <v-list-item three-line>
    <v-list-item-content>
      <v-card-text class="mb-2" style="width: 100%">
        <h1 class="text-h4">
          Oh no!! 404 Page Not Found :(
          <div class="subtitle-1 mt-4">
            Check that you typed the address correctly, go back to your
            previous page or click the link below to return home.
          </div>
        </h1>
        <div class="subtitle-1">
          <a href="/">
            Go Back Home
          </a>
        </div>
      </v-card-text>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>
