<template>
  <div>
    <template v-if="isModeGenerateErrorPage">
      <h1>{{ statusCode }} Error Page</h1>
      <nuxt-link to="/">to Top</nuxt-link>
    </template>
    <template v-else>
      <h1>Default Error Page</h1>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  computed: {
    isModeGenerateErrorPage() {
      return process.env.GENERATE_ERROR_PAGE;
    },

    // for generage error page
    statusCode() {
      if (this.error.path) {
        return this.error.path.replace('/', '');
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
