<!-- Fixed Component without props with bottons reaching the main pages   -->

<template>
  <div>
    <header
      ref="header"
      class="navbar navbar-expand-lg navbar-light px-3 header nav-down"
    >
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
          <li>
            <a class="nav-link" href="/"
              ><p class="hover-underline-animation">Topolinia</p></a
            >
          </li>
          <li
            v-for="(navItem, navItemIndex) of headerList"
            :key="`navItem${navItemIndex}`"
            class="nav-item"
          >
            <nuxt-link :to="navItem.path" class="nav-link">
              <img :src="navItem.image" alt="" width="30" height="30" />
              <p class="hover-underline-animation">{{ navItem.name }}</p>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  env:{
    lastScrollTop:0
  },
  data() {
    return {
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
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let didScroll
      const delta = 5
      const lastScrollTop=window.scrollY
      const navbarHeight = this.$refs.header.clientHeight
      // console.log(navbarHeight)
      didScroll = true
      const test = this.$refs.header.classList
      // const wHeight = window.innerHeight

      setInterval(function () {
        if (didScroll) {
          hasScrolled()
          didScroll = false
        }
      }, 150)

      function hasScrolled() {
        const st = window.scrollY
        console.log('st:' + st)
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop- st) <= delta) return
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
          // Scroll Down
          test.replace('nav-down', 'nav-up')
        } else if (st < navbarHeight || lastScrollTop - st > 0) {
          // st < lastScrollTop
          // st + wHeight < document.height()
          test.replace('nav-up', 'nav-down')
        }
        console.log("las: "+ lastScrollTop)
        // lastScrollTop = st

      }
    },
  },
}
</script>





<style scoped>
.header {
  position: fixed;
  width: 100vw;
  background: rgba(150, 150, 150, 0.8);
  z-index: 2;
  height: 10vh;
  top: 0;
}
.nav-up {
  top: -10vh;
}
.nav-down {
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

li,
a {
  margin-top: 1.1vh;
}
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: black;
  font-size: 1.6vw;
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
