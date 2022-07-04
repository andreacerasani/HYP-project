<!-- Default layout with header and footer -->
<template>
  <div class="main-page megabox">
    <the-header />
    <nuxt />
    <the-footer />
  </div>
</template>

<script>
import TheFooter from '~/components/navigation/TheFooter.vue'
import TheHeader from '~/components/navigation/TheHeader.vue'
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
  overflow: hidden;
  position: relative;
  min-height: 100vh;
}
</style>