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
    <v-app>
      <app-bar></app-bar>
      <nav-bar></nav-bar>
      <main-content></main-content>
      <state-bar></state-bar>
    </v-app>
</template>
