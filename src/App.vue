<template>
    <v-app>
      <app-bar></app-bar>
      <nav-bar></nav-bar>
      <main-content></main-content>
      <state-bar></state-bar>
    </v-app>
</template>

<script>

/**
 * Main Application
 */
import { mapState } from 'vuex';
import AppBar from "@/components/AppBar.vue";
import NavBar from "@/components/NavBar.vue";
import StateBar from "@/components/StateBar.vue";
import MainContent from "@/components/MainContent.vue";


export default {
  name: 'App',

  components: {
    'app-bar': AppBar,
    'nav-bar': NavBar,
    'main-content': MainContent,
    'state-bar': StateBar,
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState([
      'initialized',
    ])
  }
}
</script>
