<script setup>
import {useApiStore} from '@/store/api';
import {useTaskStore} from '@/store/task';
import {useEssayStore} from '@/store/essay';
const apiStore = useApiStore();
const essayStore = useEssayStore();
const taskStore = useTaskStore();


</script>

<template>
  <v-main fill-height>
    <div class="container">

      <div  class="column">
        <div class="col-header bg-grey-lighten-4" v-show="taskStore.writingEndReached">
          <h2 class="text-h6">Ihre Bearbeitungszeit ist beendet</h2>
          <p>Es ist keine weitere Eingabe möglich. Bitte überprüfen Sie, ob Sie den Text in dieser Form zur Bewertung abgeben möchten.</p>
        </div>
        <div class="col-header bg-grey-lighten-4" v-show="!taskStore.writingEndReached">
          <h2 class="text-h6">Abgabe-Text</h2>
          <p>Bitte überprüfen Sie, ob Sie den Text in dieser Form zur Bwertung abgeben möchten.
            Nach der Abgabe ist keine weitere Bearbeitung mehr möglich!</p>
        </div>

        <div class="col-content">
          <div class="review-text" v-html="essayStore.currentContent"></div>
        </div>

        <div class="col-footer text-right bg-grey-lighten-4" >
          <v-btn color="secondary" class="ma-2" :href="apiStore.returnUrl">
            <v-icon icon="mdi-file-send-outline"></v-icon>
            <span>Zur Bewertung abgeben</span>
          </v-btn>
          <v-btn class="ma-2" :href="apiStore.returnUrl" v-show="taskStore.writingEndReached">
            <v-icon icon="mdi-logout-variant"></v-icon>
            <span>Ohne Abgabe beenden</span>
          </v-btn>
          <v-btn class="ma-2" @click="apiStore.review=false" v-show="!taskStore.writingEndReached">
            <v-icon icon="mdi-file-edit-outline"></v-icon>
            <span>Weiter bearbeiten</span>
          </v-btn>
        </div>
      </div>
    </div>
  </v-main>
</template>



<style scoped>

/* Structure */

.container {
  position: fixed;
  height: calc((100% - 50px) - 50px);
  width: 100%;
  display: flex;
}

.column {
  flex: 1;
}

.col-header {
  height: 100px;
  width: 100%;
  padding: 10px;
  padding-left: 20px;
}

.col-content {
  height: calc(((100% - 100px)) - 70px);
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  padding:10px;
  padding-left: 20px;
  font-family: Serif;
}

.col-footer {
  position: fixed;
  bottom: 48px;
  padding:20px;
  width: 100%;
  background-color: lightgray;
}

.review-text {
  max-width:80em;
}

</style>