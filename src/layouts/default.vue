<template>
  <div class="main-page megabox">
    <the-header />
    <nuxt />
    <the-footer />
  </div>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style scoped>
.megabox{
  position: relative;
  padding-bottom: 25vh;
  min-height: 100vh;
}
</style>