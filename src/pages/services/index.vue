<template>
  <div>
    <top-image :title="'Services'" :bg-img="'/images/services.jpg'" />
    <breadcrumbs page-name="Services" link="/services"/>
    <simple-content :title="'Services of Venice'" />
    <card-mosaic :items="serviceList" />
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
    const { titleImg, bgImg, serviceList } = data

    return {
      titleImg,
      bgImg,
      serviceList,
    }
  },
  head() {
    return {
      title: "Services - VisitVenice",
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: 'A collection of the main services useful for a tourist in the city of Venice'
        }
      ]
    }
  },
}
</script>
