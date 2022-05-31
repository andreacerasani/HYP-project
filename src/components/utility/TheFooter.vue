<!-- Fixed Component without props for the footer  -->

<template>
  <footer class="link-primary text-center">
    <!-- <a :href="FooterLink.path"> -->
    <nuxt-link :to="FooterLink.path">
      {{ FooterLink.name }}
    </nuxt-link>
    <!-- </a> -->
    <p class="polimi-text">Politecnico Di Milano</p>
    <p class="polimi-text">Hypermedia Application</p>
    <p class="polimi-text">Worry Whales 2022</p>
  </footer>
</template>

<script>
export default {
  name: 'TheFooterComponent',
  data() {
    return {
      FooterLink: {
        name: 'ContactUs',
        path: '/contact',
      },
    }
  },
}
</script>
<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 10vh;
  max-height: 25vh;
  padding-top: 3vh;
  padding-bottom: 3vh;
  /* background-color: var(--div-color-dark); */
  background-image: linear-gradient(
    to top,
    var(--div-color-dark),
    rgba(255, 0, 0, 0)
  );
}
.polimi-text {
  color: var(--text-color);
  font-style: bold;
  margin-bottom: 1vh;
}
nuxt-link {
  color: var(--link-color);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
