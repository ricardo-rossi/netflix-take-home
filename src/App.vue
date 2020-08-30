<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container class="px-10 py-8">
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
