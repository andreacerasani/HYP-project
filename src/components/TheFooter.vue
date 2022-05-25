<!-- Fixed Component without props for the footer  -->

<template>
  <footer class="link-primary text-center">
    <a>
      <nuxt-link :to="FooterLink.path">
        {{ FooterLink.name }}
      </nuxt-link>
    </a>
    <p class="polimiText">
      Politecnico Di Milano <br />Hypermedia Application - 2022 <br/>~
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
  height:10vh;
  padding-top: 3vh;
  padding-bottom:10vh;
  background-color: var(--div-color-dark);
}
.polimiText {
  color: var(--text-color);
  font-style: bold;
}
a {
  color: var(--link-color);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
