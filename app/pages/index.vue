<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        Nuxt.js on AWS Lambda
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <p>Nuxt.js version: {{ nuxtVersion }}</p>
      <p>Build Node.js version: {{ buildNodeVersion }}</p>
      <p>Server Node.js version: {{ serverNodeVersion }}</p>
      <div class="links">
        <nuxt-link to="/about">
          About
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';
import { version as nuxtVersion } from 'nuxt/package.json';

export default {
  components: {
    Logo,
  },

  asyncData() {
    // If you want to keep version on the client side, use the store.
    const serverNodeVersion = process.server
      ? process.versions.node
      : 'unknown';

    return {
      serverNodeVersion,
    };
  },

  computed: {
    nuxtVersion: () => nuxtVersion,
    buildNodeVersion: () => process.env.NODE_VERSION,
  },
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
