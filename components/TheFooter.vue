<template>
  <footer class="link-primary text-center">
    <a>
      <nuxt-link :to="FooterLink.path">
        {{ FooterLink.name }}
      </nuxt-link>
    </a>
    <p class="polimiText">
      Politecnico Di Milano <br />Hypermedia Application - 2022
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
  height:10%;
}
.polimiText {
  color: grey;
  font-style: bold;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
