<!-- Fixed Component without props with bottons reaching the main pages   -->
<template>
  <header
    ref="header"
    class="navbar navbar-expand-xl navbar-light px-4 header py-2"
    style="
      transition: top 0.5s ease, background-color 0.5s;
      -webkit-transition: top 0.5s ease, background-color 0.5s;
    "
    :style="[
      isToggle
        ? { backgroundColor: '#80D8FD', top: header_top }
        : { backgroundColor: '#80D8FD' + header_opacity, top: header_top },
    ]"
  >
    <nuxt-link to="/" class="nav-link navbar-brand hover-zoom">
      <img
        src="/images/header_icons/logo.png"
        alt="Page Logo Visit Venice"
        height="40"
      />
    </nuxt-link>
    <button
      ref="nav_btn"
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

    <div
      id="navbarToggler"
      ref="navbarToggler"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li
          v-for="(navItem, navItemIndex) of headerList"
          :key="`navItem${navItemIndex}`"
          class="nav-item header-button-hover"
        >
          <nuxt-link :to="navItem.path" class="nav-link">
            <div class="justify-content-center px-3" @click="collapse()">
              <img
                :src="navItem.image"
                class="align-middle"
                style="height: 30px"
                :alt="removePath(navItem.image)"
              />
              <p
                class="hover-underline-animation align-middle ps-3"
                style="height: 3vh"
              >
                {{ navItem.name }}
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import common from '~/mixins/common'
export default {
  name: 'TheHeader',
  mixins: [common],
  data() {
    return {
      lastCall: false,
      lastScroll: 0,
      navbarHeight: 0,
      isScrollUp: false,
      isOnHeader: false,
      isToggle: false,
      header_opacity: '00',
      header_top: '0vh',
      headerList: [
        {
          name: 'Events',
          path: '/events',
          image: '/images/header_icons/event.png',
        },
        {
          name: 'Itineraries',
          path: '/itineraries',
          image: '/images/header_icons/itinerary.png',
        },
        {
          name: 'Services',
          path: '/services',
          image: '/images/header_icons/service.png',
        },
        {
          name: 'Points of interest',
          path: '/points-of-interest',
          image: '/images/header_icons/POI.png',
        },
        {
          name: 'City',
          path: '/city',
          image: '/images/header_icons/city.png',
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
    collapse() {
      if (window.innerWidth < 1200) {
        this.$refs.nav_btn.click()
      }
    },
    toggleClick() {
      if (this.$refs.header.classList.contains('header')) {
        this.$refs.header.classList.replace('header', 'headerToggled')
        this.$data.isToggle = true
      } else {
        setTimeout(() => {
          this.$refs.header.classList.replace('headerToggled', 'header')
          this.$data.isToggle = false
        }, 250)
      }
    },
    mouseOverHeader(event) {
      // Handle the event of mouse over the header part to show the header if hidden
      if (event.clientY < this.$refs.header.clientHeight) {
        this.$data.header_top = '0vh'
        this.$data.isOnHeader = true
      } else if (
        this.$data.isOnHeader &&
        window.scrollY > this.$refs.header.clientHeight &&
        !this.$data.isScrollUp
      ) {
        this.$data.header_top = '-' + this.$refs.header.clientHeight + 'px'
        this.$data.isOnHeader = false
      }
    },
    onScroll(event) {
      // Handle the scoll event to show or hide the header
      if (this.$data.lastCall) clearTimeout(this.$data.lastCall)

      this.$data.navbarHeight = this.$refs.header.clientHeight

      const that = this
      this.$data.lastCall = setTimeout(() => {
        this.$data.lastScroll = window.scrollY
        that.onScroll(event)
      }, 50)

      if (
        window.scrollY > this.$data.lastScroll &&
        window.scrollY > this.$data.navbarHeight &&
        !this.$data.isToggle
      ) {
        // Scroll Down
        this.$data.header_top = '-' + this.$refs.header.clientHeight + 'px'
        this.$data.isScrollUp = false
        this.$data.header_opacity = 'ff'
      } else if (
        this.$data.lastScroll - window.scrollY > 0 ||
        window.scrollY <= this.$data.navbarHeight
      ) {
        // Scroll Up
        if (window.scrollY <= this.$data.navbarHeight) {
          this.$data.header_opacity = '00'
        }
        this.$data.header_top = '0vh'
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
    z-index: 3;
    top: 0;
  }
}
@media only screen and (min-width: 1200px) {
  .header {
    position: fixed;
    width: 100vw;
    z-index: 3;
    top: 0;
  }
}

header {
  background-image: linear-gradient(
    to top,
    rgba(255, 0, 0, 0),
    var(--div-color-dark)
  );
}
.headerToggled {
  position: fixed;
  width: 100vw;
  z-index: 3;
  top: 0;
}

p {
  font-size: large;
  font-weight: 500;
}

.logo {
  color: white;
  font-size: 32px;
}

.hover-underline-animation {
  display: inline;
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
  left: 0.6rem;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.hover-zoom:hover {
  transform: scale(1.05);
}
</style>
