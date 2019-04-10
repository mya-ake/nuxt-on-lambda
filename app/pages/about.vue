<!-- prettier-ignore -->
<template>
  <section class="container">
    <div>
      <h1>About Page</h1>
      <p>Scroll down to the link.</p>
      <div class="links">
        <nuxt-link to="/">Home</nuxt-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.links {
  padding-top: 1500px;
  padding-bottom: 24px;
}
</style>
