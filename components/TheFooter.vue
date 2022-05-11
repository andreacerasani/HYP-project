<template>
  <footer class="link-primary text-center footer">
    <a class="test">
      <nuxt-link :to="pippo.path">
        {{ pippo.name }}
      </nuxt-link>
    </a>
    <p class="polimiText">Politecnico Di Milano <br>Hypermedia Application - 2022</p>
  </footer>
</template>

<script>
export default {
  name: 'TheFooterComponent',
  data() {
    return {
      pippo: {
        name: 'ContactUs',
        path: '/contact',
      },
    }
  },
}
</script>
<style scoped>
.polimiText{
  color:grey;
  font-style: bold;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
