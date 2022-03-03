<template>
  <v-main >
    <v-container color="grey" >
      <v-row dense>
        <v-col>
          <h2 class="text-h6">Aufgabenstellung</h2>
          <div v-html="instructions"></div>

          <v-card>
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
</template>

<script>
import TinyEditor from "@/components/TinyEditor.vue";
import {mapState} from "vuex";

export default {
  name: "MainContent",

  components: {
    'tiny-example': TinyEditor,
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState([
      'initialized',
      'backendUrl',
      'returnUrl',
      'userKey',
      'environmentKey',
      'authToken'
    ]),
    ...mapState('task', [
      'instructions'
    ])
  }
}
</script>

<style scoped>

</style>