<script setup>

/**
 * Main Application
 */
import AppBar from "@/components/AppBar.vue";
import NavBar from "@/components/NavBar.vue";
import StateBar from "@/components/StateBar.vue";
import MainContent from "@/components/MainContent.vue";
import {useApiStore} from '@/store/api';

const apiStore = useApiStore();
apiStore.init();

</script>

<template>
    <v-app fill-height>
      <app-bar/>
      <state-bar/>
      <nav-bar/>
      <main-content/>
    </v-app>
</template>

<style>

html {
  overflow-y: hidden !important;
}
</style>