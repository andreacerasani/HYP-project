<!-- Page that shows informations about a single itinerary -->
<template>
  <div>
    <top-image :title="data.title" :bg-img="data.image.path" />
    <breadcrumbs :page-name="data.title" :link="$route.path" />
    <group-links :page-name="data.title" type="itineraries" />
    <simple-content text-align="left" :description="data.description" />
    <map-card :web-link="data.map" />
    <hr />
    <simple-content :title="'Points of Interest'" />
    <!-- All points of interest involved in the itinerary -->
    <description-card
      v-for="(single, index) in data.pois"
      :key="index"
      :title="single.title"
      :descr-img="single.images[0].path"
      :description="single.description"
      :link-name="'Discover More'"
      :link-path="'/points-of-interest/' + single.title.replaceAll(' ', '-')"
      :is-left="isLeft(index)"
    />
    <br /><br />
    <div class="text-center">
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center my-button"
        @click="backToItineraries"
      >
        Back to Itineraries
      </button>
    </div>
  </div>
</template>

<script>
import MapCard from '~/components/informative/MapCard.vue'
import TopImage from '~/components/informative/TopImage.vue'
import DescriptionCard from '~/components/informative/DescriptionCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumbs from '~/components/navigation/Breadcrumbs.vue'
import common from '~/mixins/common'
export default {
  name: 'ItinerarySingle',
  components: {
    TopImage,
    MapCard,
    DescriptionCard,
    SimpleContent,
    Breadcrumbs,
  },
  mixins:[common],
  async asyncData({ route, $axios, error }) {
    try {
      const { title } = route.params
      const { data } = await $axios.get('/api/itineraries/' + title)

      return {
        data,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.nameItinerary,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Information about ' + this.data.title + ', an itinerary in the city of Venice',
        },
      ],
    }
  },
  mounted() {
    const groupLinks = this.retriveGroupLinks()

    const pageLinks = []
    this.$data.data.pois.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: '/points-of-interest/' + element.title.replaceAll(' ', '-'),
      })
    })

    groupLinks[2].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
  methods: {
    backToItineraries() {
      this.$router.push('/itineraries')
    },
    isLeft(index) {
      return index % 2 === 0
    },
  },
}
</script>
