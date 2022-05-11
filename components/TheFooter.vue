<template>
  <div class="link-primary text-center">
    <a class="test">
      <nuxt-link :to="pippo.path">
        {{ pippo.name }}
      </nuxt-link>
    </a>
    <p class="polimiText">Politecnico Di Milano <br>Hypermedia Application - 2022</p>
  </div>
</template>

<script>
export default {
  name: 'TheFooterComponent',
  data() {
    return {
      pippo: {
        name: 'ContactUs',
        path: '/about',
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
