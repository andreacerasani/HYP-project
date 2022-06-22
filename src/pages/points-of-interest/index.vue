<template>
  <div>
    <top-image
      :title="title"
      :bg-img="'/images/points-of-interest.jpg'"
    />
    <breadcrumbs page-name="Points Of Interest" link="/points-of-interest"/>
    <!-- TODO: change description or remove -->
    <simple-content
      :title="'Venice\'s Points of Interest'"
      :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.'"
    />
    <br>
    <card-mosaic :items="pois"/>
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
    const { title, bgImg, pois } = data
    return {
      title,
      bgImg,
      pois,
    }
  },
  head() {
    return {
      title: "Points of interest - VisitVenice",
      description: "See all points of interest in the city of Venice",
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: "All the main points of interest in the city of Venice"
        }
      ]
    }
  },
}
</script>
