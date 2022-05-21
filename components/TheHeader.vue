<!-- Fixed Component without props with bottons reaching the main pages   -->

<template>
  <header
    ref="header"
    class="navbar navbar-expand-xl navbar-light px-3 header nav-down"
  >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarToggler"
      aria-controls="navbarToggler"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="toggleClick()"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarToggler" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li>
          <nuxt-link to="/" class="nav-link">
            <p class="hover-underline-animation">Topolinia</p>
          </nuxt-link>
        </li>
        <li
          v-for="(navItem, navItemIndex) of headerList"
          :key="`navItem${navItemIndex}`"
          class="nav-item"
        >
          <nuxt-link :to="navItem.path" class="nav-link">
            <img :src="navItem.image" class="img-fluid" />
            <p class="hover-underline-animation">{{ navItem.name }}</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      lastCall: false,
      lastScroll: 0,
      navbarHeight: 0,
      isScrollUp: false,
      isOnHeader: false,
      headerList: [
        {
          name: 'Events',
          path: '/events',
          image: 'https://dummyimage.com/30x30/aa/00',
        },
        {
          name: 'Itineraries',
          path: '/itineraries',
          image: 'https://dummyimage.com/30x30/aa/00',
        },
        {
          name: 'Services',
          path: '/services',
          image: 'https://dummyimage.com/30x30/aa/00',
        },
        {
          name: 'Points of interest',
          path: '/points-of-interest',
          image: 'https://dummyimage.com/30x30/aa/00',
        },
        {
          name: 'City',
          path: '/city',
          image: 'https://dummyimage.com/30x30/aa/00',
        },
      ],
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('mousemove', this.mouseOverHeader)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('mousemove', this.mouseOverHeader)
  },
  methods: {
    toggleClick() {
      if (this.$refs.header.classList.contains('header')) {
        this.$refs.header.classList.replace('header', 'headerToggled')
      } else {
        setTimeout(() => {
          this.$refs.header.classList.replace('headerToggled', 'header')
        }, 250)
      }
    },
    mouseOverHeader(event) {
      if (event.clientY < this.$refs.header.clientHeight) {
        this.$refs.header.classList.remove('nav-up')
        this.$data.isOnHeader = true
      } else if (
        this.$data.isOnHeader &&
        window.scrollY > this.$refs.header.clientHeight &&
        !this.$data.isScrollUp
      ) {
        this.$refs.header.classList.add('nav-up')
        this.$data.isOnHeader = false
      }
    },
    onScroll(event) {
      if (this.$data.lastCall) clearTimeout(this.$data.lastCall)

      this.$data.navbarHeight = this.$refs.header.clientHeight

      const that = this
      this.$data.lastCall = setTimeout(() => {
        this.$data.lastScroll = window.scrollY
        that.onScroll(event)
      }, 50)

      if (
        window.scrollY > this.$data.lastScroll &&
        window.scrollY > this.$data.navbarHeight
      ) {
        // Scroll Down
        this.$refs.header.classList.add('nav-up')
        this.$data.isScrollUp = false
        this.$refs.header.classList.remove('header')
        this.$refs.header.classList.add('header-scolled')
      } else if (
        this.$data.lastScroll - window.scrollY > 0 ||
        window.scrollY <= this.$data.navbarHeight
      ) {
        if (window.scrollY <= this.$data.navbarHeight) {
          this.$refs.header.classList.remove('header-scolled')
          this.$refs.header.classList.add('header')
        }
        this.$refs.header.classList.remove('nav-up')
        this.$data.isScrollUp = true
      }
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 1200px) {
  .header {
    position: fixed;
    width: 100vw;
    background: rgba(150, 150, 150);
    z-index: 3;
    height: 7.5vh;
    top: 0;

    transition: opacity 0.3s;
    -webkit-transition: opacity 0.3s;
    opacity: 0
  }
  .header-scolled {
    position: fixed;
    width: 100vw;
    background: rgb(255, 255, 255, 1);
    z-index: 3;
    height: 7.5vh;
    top: 0;
  }
}
@media only screen and (min-width: 1200px) {
  .header {
    position: fixed;
    width: 100vw;
    background: rgba(150, 150, 150);
    z-index: 3;
    height: 10vh;
    top: 0;

    transition: opacity 0.3s;
    -webkit-transition: opacity 0.3s;
    opacity: 0
  }
  .header-scolled {
    position: fixed;
    width: 100vw;
    background: rgba(255, 255, 255, 1);
    z-index: 3;
    height: 10vh;
    top: 0;
  }
}

.headerToggled {
  position: fixed;
  width: 100vw;
  background: rgba(150, 150, 150);
  z-index: 3;
  top: 0;
}

p {
  font-size: 3vh;
}

.nav-up {
  top: -10vh;
}

.logo {
  color: white;
  font-size: 32px;
}
.navbar {
  transition: top 0.5s ease;
}
.navbar-hide {
  top: -56px;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: black;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
