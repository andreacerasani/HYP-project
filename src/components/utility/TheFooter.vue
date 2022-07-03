<!-- Fixed Component without props for the footer. It shows some informations and the links to contact us page and social networks -->
<template>
  <footer class="link-primary d-flex flex-row flex-wrap justify-content-center">

    <p class="polimi-text p-3 ps-4 me-lg-auto"> <img src="/images/icons/worry_logo.png" width="30em" /> Worry Whales &copy; 2022 </p>
    <p class="polimi-text p-3">Politecnico Di Milano</p>
    <p class="polimi-text p-3">Hypermedia Application</p>
    <nuxt-link :to="linkPath" class="p-3">
      {{ linkName }}
    </nuxt-link>
    <a
      href="https://www.instagram.com/visitveneziaofficial/"
      target="_blank"
      class="icon-color p-3 ms-lg-auto"
    >
      <i class="bi bi-instagram"></i>
    </a>
    <a
      href="https://www.facebook.com/visitvenezia.eu"
      target="_blank"
      class="icon-color p-3"
    >
      <i class="bi bi-facebook"></i>
    </a>
    <a
      href="https://twitter.com/venice"
      target="_blank"
      class="icon-color p-3 pe-4"
    >
      <i class="bi bi-twitter"></i>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'TheFooterComponent',
  props: {
    linkName: {
      type: String,
      required: false,
      default: 'Contact Us',
    },
    linkPath: {
      type: String,
      required: false,
      default: '/contact-us',
    },
  },
  data() {
    return {}
  },
}
</script>
<style scoped>
footer {
  position: relative;
  bottom: 0;
  width: 100%;
  min-height: 10vh;
  padding-top: 3vh;
  padding-bottom: 3vh;
  background-image: linear-gradient(
    to top,
    var(--div-color-light),
    rgba(255, 0, 0, 0)
  );
}
.icon-color {
  color: var(--secondary-text-color);
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
