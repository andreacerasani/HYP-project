<!-- Homepage of the website -->
<template>
  <div>
    <video id="bgVideo" autoplay muted loop>
      <source src="video/Venezia_panoramic.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <showcase-component :title="titleEvents" :link-path="'/events'" :content="events" :is-left="true" />
    <showcase-component :title="titleItineraries" :link-path="'/itineraries'" :content="itineraries" :is-left="false" />
    <showcase-component :title="titlePois" :link-path="'/points-of-interest'" :content="pois" :is-left="true" />


  </div>
</template>

<script>
import ShowcaseComponent from '~/components/ShowcaseComponent.vue'
export default {
  name: 'IndexPage',
  components: { ShowcaseComponent },
   async asyncData({ $axios }) {
      const response1 = await $axios.get('/api/year-events/all')
      const response2 = await $axios.get('/api/itineraries')
      const response3 = await $axios.get('/api/points-of-interest')
      const events = response1.data.all_events
      const itineraries = response2.data
      const pois = response3.data
      return {
        events,
        itineraries,
        pois
      }
  },
  data() {
    const el = {
      name: 'Event',
      img: '/images/events.jpg'
    }
    const arr = [
      el, el, el, el
    ]
    return {
      titleEvents: 'IT\'S HAPPENING HERE',
      titleItineraries: 'TAKE A RIDE',
      titlePois: 'YOU CANNOT MISS',
      arr
    }
  }
}
</script>

<style scoped>
#bgVideo {
  position: static;
  top: 0;
  right: 0;
  width: 100%;
}
</style>
