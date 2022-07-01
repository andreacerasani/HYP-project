<!-- Homepage of the website -->
<template>
  <div>
    <video id="bgVideo" autoplay muted loop>
      <source src="video/Venezia_panoramic.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <showcase-component :title="titleEvents" :link-path="'/events'" :content="arr" />


  </div>
</template>

<script>
import ShowcaseComponent from '~/components/ShowcaseComponent.vue'
export default {
  name: 'IndexPage',
  components: { ShowcaseComponent },
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
