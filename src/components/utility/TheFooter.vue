<!-- Fixed Component without props for the footer  -->
<template>
  <footer class="link-primary d-flex flex-row flex-wrap justify-content-center">
    <p class="polimi-text p-3 ">Worry Whales &copy; 2022</p>
    <p class="pt-3">-</p>
    <p class="polimi-text p-3">Politecnico Di Milano</p>
    <p class="pt-3">-</p>
    <p class="polimi-text p-3">Hypermedia Application</p>
    <p class="pt-3">-</p>
    <nuxt-link :to="linkPath" class="p-3">
      {{ linkName }}
    </nuxt-link>
  </footer>
</template>

<script>
export default {
  name: 'TheFooterComponent',
  props:{
    linkName:{
      type: String,
      required: false,
      default: 'Contact Us'
    },
    linkPath: {
      type: String,
      required: false,
      default: '/contact-us'
    }
    
  },
  data() {
    return {}
  },
}
</script>
<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 10vh;
  padding-top: 3vh;
  padding-bottom: 3vh;
  background-image: linear-gradient(
    to top,
    var(--div-color-dark),
    rgba(255, 0, 0, 0)
  );
}
.polimi-text {
  color: var(--secondary-text-color);
  font-style: bold;
  margin-bottom: auto;
}
nuxt-link {
  color: var(--link-color);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
