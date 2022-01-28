<template>
  <v-app>
    <v-app>
      <v-app-bar elevation="1" color="white" density="compact" >
          <v-app-bar-title>Klausur Vertragsrecht</v-app-bar-title>
          <v-spacer></v-spacer>


        <v-btn icon density="compact">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer elevation="2" color="grey-lighten-1" rail expand-on-hover>

        <v-list>
          <v-list-item prepend-icon="mdi-text-box-outline" title="Aufgabenstellung"></v-list-item>
          <v-list-item prepend-icon="mdi-file-edit-outline" title="Essay schreiben"></v-list-item>
          <v-list-item prepend-icon="mdi-clipboard-outline" title="Notizbrett 1"></v-list-item>
          <v-list-item prepend-icon="mdi-clipboard-outline" title="Notizbrett 2"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <v-row dense>
            <v-col cols="6">
              <v-card>
                <v-list-item>initialized: {{initialized}}</v-list-item>
                <v-list-item>backendUrl: {{backendUrl}}</v-list-item>
                <v-list-item >returnUrl: {{returnUrl}}</v-list-item>
                <v-list-item>userKey: {{userKey}}</v-list-item>
                <v-list-item>environmentKey: {{environmentKey}}</v-list-item>
                <v-list-item>authToken: {{authToken}}</v-list-item>
              </v-card>
            </v-col>
            <v-col cols="6">
              <tiny-example></tiny-example>
            </v-col>
          </v-row>
        </v-container>


      </v-main>
    </v-app>
  </v-app>
</template>

<script>

/**
 * Main Application
 */
import { mapState } from 'vuex';
import TinyEditor from "@/components/TinyEditor.vue";

export default {
  name: 'App',

  components: {
    'tiny-example': TinyEditor
  },

  data: () => ({
    //
  }),

  computed: mapState([
    'initialized',
    'backendUrl',
    'returnUrl',
    'userKey',
    'environmentKey',
    'authToken'
  ])
}
</script>
