<template>
  <editor
      api-key="no-api-key"
      :init="{
         height: 500,
         menubar: false,
         plugins:
           'lists charmap'
         ,
         toolbar:
           'undo redo | formatselect | bold italic | \
           bullist numlist outdent indent | removeformat | charmap'
       }"
  />
</template>

<script>
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

export default {
  name: "TinyEditor",
  components: {
    'editor': Editor
  }
}
</script>


<style>


</style>