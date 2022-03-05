<script setup>

/**
 * Main Application
 */
import AppBar from "@/components/AppBar.vue";
import NavBar from "@/components/NavBar.vue";
import StateBar from "@/components/StateBar.vue";
import ContentArea from "@/components/ContentArea.vue";
import {useApiStore} from '@/store/api';

const apiStore = useApiStore();
apiStore.init();

</script>

<template>
    <v-app>
      <app-bar/>
      <nav-bar/>
      <content-area/>
      <state-bar/>
    </v-app>
</template>
