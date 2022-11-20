<script setup>

/**
 * AApplication bar
 */
import Timer from "@/components/Timer.vue";
import Alerts from "@/components/Alerts.vue";

import {useApiStore} from '@/store/api';
import {useTaskStore} from "../store/task";
import {useAlertStore} from '@/store/alerts';
import {useEssayStore} from '@/store/essay';

const apiStore = useApiStore();
const taskStore = useTaskStore();
const alertStore = useAlertStore();
const essayStore = useEssayStore();

function getTitle() {
  return (taskStore.writer_name == null ? '' : taskStore.writer_name + ', ') + (taskStore.title ?? '');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function closeWriter() {
  await essayStore.updateContent(false, true);
  await sleep(500);
  window.location = apiStore.returnUrl;
}

async function openReview() {
  await essayStore.updateContent(false, true);
  await sleep(500);
  apiStore.review=true;
}

</script>

<template>
  <v-app-bar elevation="1" color="white" density="compact" >
    <v-app-bar-title>{{getTitle()}}</v-app-bar-title>
    <v-spacer></v-spacer>

    <alerts v-if="alertStore.hasAlerts"></alerts>
    <timer v-if="taskStore.hasWritingEnd"></timer>

    <v-btn v-show="!apiStore.review">
      <v-icon left icon="mdi-logout-variant"></v-icon>
      <span>Beenden ...</span>

      <v-menu activator="parent" anchor="bottom end" origin="end top">
        <v-card>
          <v-list>
            <v-list-item @click="closeWriter()">
                <v-list-item-title>Unterbrechen</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openReview">
              <v-list-item-title>Vorschau / Abgabe ...</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-btn>
  </v-app-bar>

</template>
