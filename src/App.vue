<template>
  <v-app>
    <v-main>
      <v-container class="pa-10">
        <v-row
            align="center"
            justify="center"
        >
          <router-view></router-view>
        </v-row>
      </v-container>
      <!--      <HelloWorld/>-->
      <!--      <Test/>-->
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Test from './components/Test';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    // Test,
  },

  data: () => ({
    //
  }),
};
</script>
