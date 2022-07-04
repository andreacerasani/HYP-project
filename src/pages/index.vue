<!-- Homepage of the website -->
<template>
  <div>
    <div class=" fill px-0">
      <img
        class="overlay"
        src="/images/header_icons/logo3.png"
        alt="Page Logo Visit Venice"
      />
      <video id="bgVideo" autoplay muted loop alt="View of Venice">
        <source src="video/Venezia_panoramic.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
    </div>
    <showcase-component
      :title="titleEvents"
      :link-path="'/events'"
      :content="events"
      :is-left="true"
      :link-name="'See all Events'"
    />
    <showcase-component
      :title="titleItineraries"
      :link-path="'/itineraries'"
      :content="itineraries"
      :is-left="false"
      :link-name="'See all Itineraries'"
    />
    <showcase-component
      :title="titlePois"
      :link-path="'/points-of-interest'"
      :content="pois"
      :is-left="true"
      :link-name="'See all Points of Interest'"
    />
  </div>
</template>

<script>
import ShowcaseComponent from '~/components/ShowcaseComponent.vue'
import common from '~/mixins/common'
export default {
  name: 'IndexPage',
  components: { ShowcaseComponent },
  mixins:[common],
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/homepage')
    const { events, itineraries, pois } = data

    return {
      events,
      itineraries,
      pois,
    }
  },
  data() {
    return {
      titleEvents: "IT'S HAPPENING HERE",
      titleItineraries: 'TAKE A RIDE',
      titlePois: 'YOU CANNOT MISS',
    }
  },

  // The head values are taken from nuxt.config.js

  mounted() {
    // Create Breadcrumbs
    const breadArray = []
    sessionStorage.setItem('bread', JSON.stringify(breadArray))

    // Handle GroupLinks
    const groupLinks = this.retriveGroupLinks()

    // Save events in group links
    let pageLinks = []
    this.$data.events.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[1].links = pageLinks

    // Save points of interest in group links
    pageLinks = []
    this.$data.pois.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[2].links = pageLinks

    // Save itineraries in group links
    pageLinks = []
    this.$data.itineraries.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[3].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
}
</script>

<style scoped>
#bgVideo {
  position: static;
  top: 0;
  right: 0;
  object-fit: cover;
}
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 80vmin;
  position:relative;
}
.fill video {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}
.overlay {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index:1;
    width: 80vmin;
}
</style>
