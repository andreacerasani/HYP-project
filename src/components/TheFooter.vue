<!-- Fixed Component without props for the footer  -->

<template>
  <footer class="link-primary text-center">
    <a>
      <nuxt-link :to="FooterLink.path">
        {{ FooterLink.name }}
      </nuxt-link>
    </a>
    <p class="polimiText">
      Politecnico Di Milano
    </p>
    <p class="polimiText">
      Hypermedia Application
    </p>
    <p class="polimiText">
      Worry Whales 2022
    </p>
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
footer{
  position:absolute;
  bottom:0;
  width: 100%;
  min-height:10vh;
  max-height:25vh;
  padding-top: 3vh;
  padding-bottom:10vh;
  /* background-color: var(--div-color-dark); */
  background-image: linear-gradient(to top, var(--div-color-dark),rgba(255,0,0,0));
}
.polimiText {
  color: var(--text-color);
  font-style: bold;
  margin-bottom: 1vh;
}
a {
  color: var(--link-color);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
