<script setup>
/*
* Import TinyMCE
*/
import 'tinymce';
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default';
// A theme is also required
import 'tinymce/themes/silver';
// Import the skin
import 'tinymce/skins/ui/oxide/skin.css';
/* Import plugins */
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
/* Import tiny vue integration */
import Editor from '@tinymce/tinymce-vue'

import {useEssayStore} from '@/store/essay';
const essayStore = useEssayStore();

// Used for retrieving the editor instance using the tinymce.get('ID') method.
const id = "essay";
</script>

<template>
  <editor
      :id="id"
      v-model="essayStore.currentContent"
      @change="essayStore.updateContent(true)"
      @keyup="essayStore.updateContent(true)"
      api-key="no-api-key"
      :init="{
        height: '100%',
        menubar: false,
        plugins:
           'lists charmap'
        ,
        toolbar:
           'undo redo | formatselect | bold italic | \
           bullist numlist outdent indent | removeformat | charmap',
        custom_undo_redo_levels: 10
       }"
  />
</template>

<style>
.tox-statusbar {
  display: none!important;
}
</style>