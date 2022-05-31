<template>
  <div>
    <top-image
      :title="title"
      :bg-img="'/images/points-of-interest.jpg'"
    />
    <simple-content
      :title="'Venice\'s Points of Interest'"
      :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.'"
    />
    <CardMosaic :items="pois"/>
  </div>
</template>

<script>
import SimpleContent from '~/components/SimpleContent.vue'
import TopImage from '~/components/TopImage.vue'
import CardMosaic from '~/components/CardMosaic.vue'
export default {
  name: 'PointsOfInterest',
  components: {
    TopImage,
    SimpleContent,
    CardMosaic,
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
}
</script>
