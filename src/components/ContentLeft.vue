<script setup>
  import {useTaskStore} from '@/store/task';
  const taskStore = useTaskStore();
</script>

<template>
  <h2 class="text-h6">Aufgabenstellung</h2>
  <div v-html="taskStore.instructions"></div>
  <v-toolbar position="bottom" elevation="0">left</v-toolbar>

</template>