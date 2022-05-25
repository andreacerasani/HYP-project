<template>
  <div class="container position-absolute top-50 start-50 translate-middle">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <p>{{error.message}}</p>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
    name: 'ErrorPage',
  layout: 'defaultLayout',
  props: {
      error: {
          type: Object,
          required: true,
          }
  },
}
</script>


<style scoped>
.container{
    text-align: center;
}
</style>