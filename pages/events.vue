<template>
  <span>
    <top-image :title-img="titleImg" :bg-img="bgImg" />
    <!-- insert carousell -->
    <description-card />
    <description-card />
    <description-card />
  </span>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import DescriptionCard from '~/components/DescriptionCard.vue'
export default {
  name: 'EventsPage',
  components: {
    TopImage,
    DescriptionCard,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/multipleGets')

    return {
      data
    }
  },
  data() {
    return {}
  },
}
</script>