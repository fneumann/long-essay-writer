<script setup>
import {useLayoutStore} from "../store/layout";
const layoutStore = useLayoutStore();
</script>

<template>
  <v-navigation-drawer elevation="2" color="grey-lighten-4" permanent rail expand-on-hover>

    <v-list color="grey-lighten-4" >
      <v-list-item :prepend-icon="layoutStore.instructionsVisible ? 'mdi-text-box': 'mdi-text-box-outline'" title="Aufgabenstellung"></v-list-item>
      <v-list-item prepend-icon="mdi-file-edit-outline" title="Essay schreiben"></v-list-item>
      <v-list-item prepend-icon="mdi-clipboard-outline" title="Notizbrett"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

.navActive {
}

</style>
