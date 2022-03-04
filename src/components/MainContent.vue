<script setup>
import {useTaskStore} from '@/store/task';
import {useApiStore} from '@/store/api';
import TinyEditor from "@/components/TinyEditor.vue";

const apiStore = useApiStore();
const taskStore = useTaskStore();

</script>

<template>
  <v-main >
    <v-container color="grey" >
      <v-row dense>
        <v-col>
          <h2 class="text-h6">Aufgabenstellung</h2>
          <div v-html="taskStore.instructions"></div>

          <v-card>
            <v-list-item>initialized: {{apiStore.initialized}}</v-list-item>
            <v-list-item>backendUrl: {{apiStore.backendUrl}}</v-list-item>
            <v-list-item >returnUrl: {{apiStore.returnUrl}}</v-list-item>
            <v-list-item>userKey: {{apiStore.userKey}}</v-list-item>
            <v-list-item>environmentKey: {{apiStore.environmentKey}}</v-list-item>
            <v-list-item>authToken: {{apiStore.authToken}}</v-list-item>
          </v-card>
        </v-col>
        <v-col color="white">
          <h2 class="text-h6">Mein Text</h2>
          <tiny-editor></tiny-editor>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
