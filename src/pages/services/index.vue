<template>
  <div>
    <top-image :title="'Services'" :bg-img="'/images/services.jpg'" />
    <breadcrumps page-name="services" />
    <simple-content :title="'Services of Venice'" />
    <card-mosaic :items="serviceList" />
  </div>
</template>

<script>
import TopImage from '~/components/utility/TopImage.vue'
import CardMosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumps from '~/components/Breadcrumps.vue'

export default {
  name: 'MainServicesPage',
  components: {
    TopImage,
    CardMosaic,
    SimpleContent,
    Breadcrumps,
  },
  async asyncData({ $axios }) {
    // db request
    const { data } = await $axios.get('/api/services')
    const { titleImg, bgImg, serviceList } = data

    return {
      titleImg,
      bgImg,
      serviceList,
    }
  },
}
</script>
