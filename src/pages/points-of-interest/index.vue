<!-- Page that shows all the main points of interest inside a mosaic -->
<template>
  <div>
    <top-image
      :title="'Points of Interest'"
      :bg-img="'/images/points-of-interest.jpg'"
    />
    <breadcrumbs page-name="Points Of Interest" link="/points-of-interest" />
    <simple-content :title="'Venice\'s Points of Interest'" />
    <br />
    <mosaic :items="data" />
  </div>
</template>

<script>
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/informative/TopImage.vue'
import Mosaic from '~/components/mosaics/Mosaic.vue'
import Breadcrumbs from '~/components/navigation/Breadcrumbs.vue'
import common from '~/mixins/common'
export default {
  name: 'PointsOfInterest',
  components: {
    TopImage,
    SimpleContent,
    Mosaic,
    Breadcrumbs,
  },
  mixins:[common],
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
    const groupLinks = this.retriveGroupLinks()

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
