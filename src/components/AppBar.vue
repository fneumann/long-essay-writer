<script setup>
  import {useApiStore} from '@/store/api';
  import {useTaskStore} from "../store/task";
  const apiStore = useApiStore();
  const taskStore = useTaskStore();

  function getTitle() {
    return (taskStore.writer_name == null ? '' : taskStore.writer_name + ', ') + (taskStore.title ?? '');
  }
</script>

<template>
  <v-app-bar elevation="1" color="white" density="compact" >
    <v-app-bar-title>{{getTitle()}}</v-app-bar-title>
    <v-spacer></v-spacer>

<!--
    <v-btn>
      <v-icon left icon="mdi-bell-outline"></v-icon>
      <span>0 Mitteilungen</span>
    </v-btn>
-->

<!--
    <v-btn>
      <v-icon left icon="mdi-clock-outline"></v-icon>
      <span>Restzeit 02:13h</span>
    </v-btn>
-->

    <v-btn :href="apiStore.returnUrl">
      <v-icon left icon="mdi-logout-variant"></v-icon>
      <span>Beenden ...</span>
    </v-btn>
  </v-app-bar>

</template>
