<!-- Page that show all service types -->
<template>
  <div>
    <top-image :title="'Services'" :bg-img="'/images/services.jpg'" />
    <breadcrumbs page-name="Services" link="/services" />
    <simple-content :title="'Services of Venice'" />
    <mosaic :items="data" />
  </div>
</template>

<script>
import TopImage from '~/components/utility/TopImage.vue'
import Mosaic from '~/components/mosaics/Mosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import common from '~/mixins/common'

export default {
  name: 'MainServicesPage',
  components: {
    TopImage,
    Mosaic,
    SimpleContent,
    Breadcrumbs,
  },
  mixins:[common],
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
    const groupLinks = this.retriveGroupLinks()

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
