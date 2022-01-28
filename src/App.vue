<template>
  <div id="app">
    <tiny-example></tiny-example>
    <p>initialized: {{initialized}}</p>
    <p>backendUrl: {{backendUrl}}</p>
    <p>returnUrl: {{returnUrl}}</p>
    <p>userKey: {{userKey}}</p>
    <p>environmentKey: {{environmentKey}}</p>
    <p>authToken: {{authToken}}</p>
  </div>
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
