<template>
  <v-app>
    <Header/>
    <v-main class="mainBg">
      <v-container class="pt-6">
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'App',

  components: {
    Footer,
    Header
  },
};
</script>
