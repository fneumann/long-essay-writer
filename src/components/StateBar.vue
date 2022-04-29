<script setup>
  import {useEssayStore} from '@/store/essay';
  const essayStore = useEssayStore();
</script>

<template>
  <v-app-bar position="bottom" height="48" color="grey-lighten-5" elevation="1">
    history: {{essayStore.historyLength}} |
    unsent: {{essayStore.openSendings}}
  </v-app-bar>
</template>
