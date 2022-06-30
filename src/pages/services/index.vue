<!-- Page that show all service types -->
<template>
  <div>
    <top-image :title="'Services'" :bg-img="'/images/services.jpg'" />
    <breadcrumbs page-name="Services" link="/services" />
    <simple-content :title="'Services of Venice'" />
    <card-mosaic :items="data" />
  </div>
</template>

<script>
import TopImage from '~/components/utility/TopImage.vue'
import CardMosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  name: 'MainServicesPage',
  components: {
    TopImage,
    CardMosaic,
    SimpleContent,
    Breadcrumbs,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/services')

    return {
      data,
    }
  },

  head() {
    return {
      title: 'Services - VisitVenice',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A collection of the main services useful for a tourist in the city of Venice',
        },
      ],
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
    this.$data.data.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[0].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
}
</script>
