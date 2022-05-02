<script setup>
  import {useTaskStore} from "../store/task";
  import {useLayoutStore} from "../store/layout";
  import { ref } from 'vue';

  const taskStore = useTaskStore();
  const layoutStore = useLayoutStore();

  let remainingTime = ref('');
  updateTimer();

  function updateTimer() {
      remainingTime.value = formatTimespan(taskStore.remainingTime());
  }

  function formatTimespan(milliseconds)
  {
    const seconds = ('00'+ (Math.floor(milliseconds / 1000) % 60)).slice(-2);
    const minutes = ('00' + (Math.floor(milliseconds / 60000) % 60)).slice(-2);
    const hours = ('00' + (Math.floor(milliseconds / 3600000)  % 24)).slice(-2);
    const days = Math.floor(milliseconds / 86400000);

    if (days > 1) {
      return days + ' Tage ' + hours + ' Stunden';
    }
    else if (days > 0) {
      return days + ' Tag ' + hours + ' Stunden';
    }
    else if (hours != '00') {
      return hours + ':' + minutes + ' Stunden';
    }
    else if (minutes != '00') {
      return minutes + ':' + seconds + ' Minuten';  // todo: son't show seconds
    }
    else  {
      return seconds + ' Sekunden';
    }
  }

  setInterval(updateTimer, 1000)

</script>



<template>
  <v-btn @click="layoutStore.toggleTimer()">
    <v-icon left icon="mdi-clock-outline"></v-icon>
    <span v-show=layoutStore.showTimer>{{ remainingTime }}</span>
  </v-btn>
</template>



<style scoped>

</style>