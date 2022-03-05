<script setup>
  import {useApiStore} from '@/store/api';
  const apiStore = useApiStore();

</script>

<template>
  <v-app-bar position="bottom" height="48" color="grey-lighten-5" elevation="1">
    initialized: {{apiStore.initialized}}
  </v-app-bar>
</template>
