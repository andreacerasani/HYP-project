<template>
  <div>
    <top-image :title="data.title" :bg-img="data.image.path" />
    <breadcrumbs :page-name="data.title" :link="$route.path" />
    <group-links :page-name="data.title" type="itineraries" />
    <simple-content text-align="center" :description="data.description" />
    <map-card :web-link="data.map" />
    <hr>
    <simple-content :title="'Points of Interest'" />
    <description-card
      v-for="(single, index) in data.pois"
      :key="index"
      :title="single.title"
      :descr-img="single.images[0].path"
      :description="single.description"
      :link-name="'Discover'"
      :link-path="'/points-of-interest/' + single.title.replaceAll(' ', '-')"
      :is-left="isLeft(index)"
    />
  </div>
</template>

<script>
import MapCard from '~/components/main-elements/MapCard.vue'
import TopImage from '~/components/utility/TopImage.vue'
import DescriptionCard from '~/components/main-elements/DescriptionCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default {
  name: 'ItinerarySingle',
  components: {
    TopImage,
    MapCard,
    DescriptionCard,
    SimpleContent,
    Breadcrumbs,
  },
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
    }
  },
  mounted() {
    const linksJson = sessionStorage.getItem('groupLinks')

    let groupLinks = []
    if (linksJson == null || linksJson === 'undefined') {
      groupLinks = [
        { type: 'services', links: [] },
        { type: 'events', links: [] },
        { type: 'pois', links: [] },
        { type: 'itineraries', links: [] },
        { type: 'event-type', links: [] },
      ]
    } else {
      groupLinks = JSON.parse(linksJson)
    }

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
    backToInieraries() {
      this.$router.push('/itineraries')
    },
    isLeft(index) {
      return index % 2 === 0
    },
  },
}
</script>
