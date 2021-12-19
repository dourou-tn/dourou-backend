<template>
  <quill-editor
    :content="value"
    :options="editorOption"
    @change="onEditorChange($event)"
  />
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import { quillEditor } from 'vue-quill-editor';
  
  export default {
    name: 'EditorComponent',

    props: ['value'],
  
    components: { quillEditor },

    data () {
      return {
        content: '',
        editorOption: {
          // Some Quill options...
        }
      }
    },
    methods: {
      onEditorChange({ quill, html, text }) { // eslint-disable-line
        this.content = html
        this.$emit('input', this.content);
      }
    },
  }
</script>
<style>
  .ql-toolbar.ql-snow {
    background-color: wheat !important;
  }
  .ql-editor.ql-blank::before {
    color: wheat !important;
  }
</style>