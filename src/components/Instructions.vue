<script setup>
  import {useTaskStore} from '@/store/task';
  const taskStore = useTaskStore();
</script>

<template>
  <div v-html="taskStore.instructions"></div>
</template>