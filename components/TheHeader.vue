<template>
  <nav class="navbar navbar-expand-lg navbar-light px-3 header">
    <a class="navbar-brand" href="/">Topolinia</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarToggler"
      aria-controls="navbarToggler"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarToggler" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li
          v-for="(navItem, navItemIndex) of headerList"
          :key="`navItem${navItemIndex}`"
          class="nav-item"
        >
          <nuxt-link :to="navItem.path" class="nav-link">
            <img :src="navItem.image" alt="" width="30" height="30" />
            {{ navItem.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      headerList: [
        {
          name: 'Events',
          path: '/events',
          image: 'https://dummyimage.com/30x30/000/fff',
        },
        {
          name: 'Itineraries',
          path: '/itineraries',
          image: 'https://dummyimage.com/30x30/000/fff',
        },
        {
          name: 'Services',
          path: '/services',
          image: 'https://dummyimage.com/30x30/000/fff',
        },
        {
          name: 'Points of interest',
          path: '/poi',
          image: 'https://dummyimage.com/30x30/000/fff',
        },
        {
          name: 'City',
          path: '/city',
          image: 'https://dummyimage.com/30x30/000/fff',
        },
      ],
    }
  },
}
</script>

<style scoped>
.header {
  background: orange;
}
.logo {
  color: white;
  font-size: 32px;
}
</style>
