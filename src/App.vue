<template>
  <v-app>
    <v-app>
      <v-app-bar elevation="1" color="white" density="compact" >
          <v-app-bar-title>Fred Neumann, Klausur Vertragsrecht I</v-app-bar-title>
          <v-spacer></v-spacer>


        <v-btn>
          <v-icon left icon="mdi-bell-outline"></v-icon>
          <span>2 Mitteilungen</span>
        </v-btn>

        <v-btn>
          <v-icon left icon="mdi-clock-outline"></v-icon>
          <span>Restzeit 02:13h</span>
        </v-btn>

        <v-btn>
          <v-icon left icon="mdi-logout-variant"></v-icon>
          <span>Beenden ...</span>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer elevation="2" color="grey-lighten-2" rail expand-on-hover>

        <v-list>
          <v-list-item prepend-icon="mdi-text-box-outline" title="Aufgabenstellung"></v-list-item>
          <v-list-item prepend-icon="mdi-file-edit-outline" title="Essay schreiben"></v-list-item>
          <v-list-item prepend-icon="mdi-clipboard-outline" title="Notizbrett 1"></v-list-item>
          <v-list-item prepend-icon="mdi-clipboard-outline" title="Notizbrett 2"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main >
        <v-container color="grey" >
          <v-row dense>
            <v-col>
              <h2 class="text-h6">Aufgabenstellung</h2>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

              <v-card hidden>
                <v-list-item>initialized: {{initialized}}</v-list-item>
                <v-list-item>backendUrl: {{backendUrl}}</v-list-item>
                <v-list-item >returnUrl: {{returnUrl}}</v-list-item>
                <v-list-item>userKey: {{userKey}}</v-list-item>
                <v-list-item>environmentKey: {{environmentKey}}</v-list-item>
                <v-list-item>authToken: {{authToken}}</v-list-item>
              </v-card>
            </v-col>
            <v-col color="white">
              <h2 class="text-h6">Mein Text</h2>
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
