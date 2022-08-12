<script setup>
import {useAlertStore} from '@/store/alerts';
const alertStore = useAlertStore();
</script>

<template>
  <v-btn @click="alertStore.showAlerts()" v-show="alertStore.hasAlerts">
    <v-icon left icon="mdi-bell-outline"></v-icon>
    <span v-show="alertStore.countAlerts == 1">1 Nachricht</span>
    <span v-show="alertStore.countAlerts > 1">{{ alertStore.countAlerts }} Nachrichten</span>
  </v-btn>

   <v-dialog persistent v-model="alertStore.hasActiveAlert">
      <v-card>
        <v-card-title>
          Nachricht der Aufsicht:
        </v-card-title>
        <v-card-text>
          <p>{{alertStore.activeMessage}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="alertStore.hideAlert()">
            <v-icon left icon="mdi-check"></v-icon>
            <span>OK</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-dialog persistent v-model="alertStore.showAllAlerts">
    <v-card>
      <v-card-title>
        Nachrichten der Aufsicht:
      </v-card-title>
      <v-card-text>
        <template v-for="alert in alertStore.alerts" v-bind:key="alert.key">
          <p><strong>{{ alertStore.formatTimestamp(alert.time) }}</strong></p>
          <p>{{ alert.message }}</p>
          <br>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="alertStore.hideAlert()">
          <v-icon left icon="mdi-check"></v-icon>
          <span>OK</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style scoped>

</style>