<template>
  <div >
    <top-image :title="'Services'" :bg-img="'/images/services.png'" />
    <card-mosaic :items="serviceList" />
  </div>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import CardMosaic from '~/components/CardMosaic.vue'

export default {
  name: 'MainServicesPage',
  components: {
    TopImage,
    CardMosaic,
  },
  async asyncData({ $axios }) {
    // db request
    const { data } = await $axios.get('/api/main-services')
    const { titleImg, bgImg, serviceList } = data

    return {
      titleImg,
      bgImg,
      serviceList,
    }
  },
}
</script>

