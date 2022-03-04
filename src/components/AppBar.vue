<template>
  <v-app-bar elevation="1" color="white" density="compact" >
    <v-app-bar-title>Fred Neumann, Klausur Vertragsrecht I</v-app-bar-title>
    <v-spacer></v-spacer>


    <v-btn>
      <v-icon left icon="mdi-bell-outline"></v-icon>
      <span>0 Mitteilungen</span>
    </v-btn>

    <v-btn>
      <v-icon left icon="mdi-clock-outline"></v-icon>
      <span>Restzeit 02:13h</span>
    </v-btn>

    <v-btn :href="returnUrl">
      <v-icon left icon="mdi-logout-variant"></v-icon>
      <span>Beenden ...</span>
    </v-btn>
  </v-app-bar>

</template>

<script>
import { mapState } from 'pinia'
import {useApiStore} from '@/store/api';


export default {
  name: "AppBar",

  components: {
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState(useApiStore, [
      'returnUrl'
    ])
  }
}
</script>

<style scoped>

</style>