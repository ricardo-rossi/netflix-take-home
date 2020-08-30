<template>
  <v-app>
    <Header/>
    <v-main class="_d-flex">
      <v-container class="px-10 py-8">
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
    <Footer/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Test from './components/Test';

import Header from '@/components/Header';
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    Footer,
    Header
    // HelloWorld,
    // Test,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.main-container {
  width: 100%;
  min-width: 800px;
  max-width: 940px;
  margin: auto;
}
</style>
