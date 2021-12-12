<template>
  <div>
    <editor v-model="content" />
    <div v-html="content" />
  </div>
</template>

<script>
  import Editor from '../../components/Editor.vue';

  export default {
    name: 'ProductIndex',

    components: { Editor },

    data () {
      return {
        content: '',
      }
    },
  }
</script>