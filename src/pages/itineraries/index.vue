<template>
  <div>
    <top-image :bg-img="'images/itineraries.jpg'" :title="'Itineraries'" />
    <breadcrumbs page-name="itineraries" link="/itineraries"/>
    <img-des-carousel
      :num-of-carousel="1"
      title="Best Itineraries"
      link-name="Discover More"
      :myarray="filtered"
    />
    <simple-content title="All Itineraries" />
    <mosaic :items="itineraries" />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
/* import CarouselMultiElement from '~/components/carousels/MultiElementCarousel.vue' */
import ImgDesCarousel from '~/components/carousels/ImageDescriptionCarousel.vue'
import Mosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'
export default {
  name: 'ItinerariesPage',
  components: {
    TopImage,
    /* CarouselMultiElement, */
    ImgDesCarousel,
    Mosaic,
    SimpleContent,
    Breadcrumbs,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/itineraries')
    const { title, bgImg, itineraries } = data

    const filtered = []
    for (const element of itineraries) {
      if (element.description != null) {
        filtered.push({
          title: element.title,
          img: element.img,
          description: element.description,
          linkPath: element.linkPath,
        })
      }
    }

    return {
      title,
      bgImg,
      itineraries,
      filtered,
    }
  },
}
</script>
