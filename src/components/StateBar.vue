<script setup>
  import {useApiStore} from '@/store/api';
  import {useEssayStore} from '@/store/essay';
  const apiStore = useApiStore();
  const essayStore = useEssayStore();
</script>

<template>
  <v-app-bar position="bottom" height="48" color="grey-lighten-5" elevation="1">
    initialized: {{apiStore.initialized}} |
    history: {{essayStore.historyLength}}
  </v-app-bar>
</template>
