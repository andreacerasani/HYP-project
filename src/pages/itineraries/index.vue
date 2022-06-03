<template>
  <div>
    <top-image :bg-img="'images/itineraries.jpg'" :title="'Itineraries'" />
    <carousel-multi-element
      title="Best Itineraries"
      :my-array="itineraries"
      :num-of-carousel="1"
    />
    <mosaic 
    :items="itineraries"
    />
  </div>
</template>

<script>
import CarouselMultiElement from '~/components/carousels/MultiElementCarousel.vue'
import Mosaic from '~/components/mosaics/CardMosaic.vue'
import TopImage from '~/components/utility/TopImage.vue'
export default {
  name: 'ItinerariesPage',
  components: {
    TopImage,
    CarouselMultiElement,
    Mosaic,
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
