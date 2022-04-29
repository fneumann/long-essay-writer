<script setup>
import {useApiStore} from '@/store/api';
import {useEssayStore} from '@/store/essay';
const apiStore = useApiStore();
const essayStore = useEssayStore();


</script>

<template>
  <v-main fill-height>
    <div class="container">

      <div  class="column">
        <div class="col-header">
          <h2 class="text-h6">Abgabe-Text</h2>
          <p>Bitte überprüfen Sie, ob Sie den Text in dieser Form abgeben möchten. Klicken Sie dann auf "Abgeben".
            Nach der Abgabe ist keine weitere Bearbeitung mehr möglich!</p>
        </div>

        <div class="col-content" v-html="essayStore.currentContent">
        </div>

        <div class="col-footer text-right" >
          <v-btn class="ma-2" :href="apiStore.returnUrl">
            <v-icon icon="mdi-logout-variant"></v-icon>
            <span>Abgeben...</span>
          </v-btn>
          <v-btn class="ma-2" @click="apiStore.review=false">
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
  background-color: lightgray;
  padding: 10px;
}

.col-content {
  height: calc(((100% - 100px)) - 70px);
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  padding:10px;
}

.col-footer {
  position: fixed;
  bottom: 48px;
  padding:20px;
  width: 100%;
  background-color: lightgray;
}

</style>