<template>
  <div>
    <top-image :bg-img="'images/itineraries.jpg'" :title="'Itineraries'" />
    <carousel-multi-element
      title="Best Itineraries"
      :my-array="itineraries"
      :num-of-carousel="1"
    />
    <simple-content title="All Itineraries"/>
    <mosaic 
    :items="itineraries"
    />
  </div>
</template>

<script>
import CarouselMultiElement from '~/components/carousels/MultiElementCarousel.vue'
import Mosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'
export default {
  name: 'ItinerariesPage',
  components: {
    TopImage,
    CarouselMultiElement,
    Mosaic,
    SimpleContent,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/itineraries')
    const { title, bgImg, itineraries } = data

    return {
      title,
      bgImg,
      itineraries,
    }
  },
}
</script>
