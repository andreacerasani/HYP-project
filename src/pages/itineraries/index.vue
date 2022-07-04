<!-- Page that shows all itineraries -->
<template>
  <div>
    <top-image :bg-img="'images/itineraries.jpg'" :title="'Itineraries'" />
    <breadcrumbs page-name="Itineraries" link="/itineraries" />
    <img-des-carousel
      :num-of-carousel="1"
      title="Best Itineraries"
      link-name="Discover More"
      :elements-to-show="filtered"
    />
    <simple-content title="All Itineraries" />
    <mosaic :items="data" />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/navigation/Breadcrumbs.vue'
import ImgDesCarousel from '~/components/carousels/ImageDescriptionCarousel.vue'
import Mosaic from '~/components/mosaics/Mosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/informative/TopImage.vue'
import common from '~/mixins/common'
export default {
  name: 'ItinerariesPage',
  components: {
    TopImage,
    ImgDesCarousel,
    Mosaic,
    SimpleContent,
    Breadcrumbs,
  },
  mixins:[common],
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/itineraries')

    const filtered = []
    for (const element of data) {
      if (element.description != null) {
        filtered.push({
          title: element.title,
          images: element.images,
          description: element.description,
          linkPath: element.linkPath,
        })
      }
    }

    return {
      data,
      filtered,
    }
  },
  head() {
    return {
      title: 'Itineraries - VisitVenice',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A collection of some interesting itineraries in the city of Venice',
        },
      ],
    }
  },
  mounted() {
    const groupLinks = this.retriveGroupLinks()

    const pageLinks = []
    this.$data.filtered.forEach((element) => {
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
