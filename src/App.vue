<template>
  <component :is="layout">
    <router-view :key="$route.fullPath" />
  </component>
</template>

<script>

export default {
  name: 'App',

  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  }
};
</script>

<style>
  .v-list-item__title {
    color: white;
  }

  .v-picker--date {
    height: 100%;
  }
</style>
