<template>
  <div>
    <top-image
      :title="'Points of Interest'"
      :bg-img="'/images/points-of-interest.jpg'"
    />
    <breadcrumbs page-name="Points Of Interest" link="/points-of-interest" />
    <!-- TODO: change description or remove -->
    <simple-content
      :title="'Venice\'s Points of Interest'"
      :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.'"
    />
    <br />
    <card-mosaic :items="data" />
  </div>
</template>

<script>
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'
import CardMosaic from '~/components/mosaics/CardMosaic.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default {
  name: 'PointsOfInterest',
  components: {
    TopImage,
    SimpleContent,
    CardMosaic,
    Breadcrumbs,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/points-of-interest')
    return {
      data,
    }
  },
  head() {
    return {
      title: 'Points of interest - VisitVenice',
      description: 'See all points of interest in the city of Venice',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'All the main points of interest in the city of Venice',
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

    groupLinks[2].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
}
</script>
