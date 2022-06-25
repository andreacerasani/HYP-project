<template>
  <div>
    <top-image :title="data.title" :bg-img="data.bgImg" />
    <breadcrumbs :page-name="data.title" :link="$route.path"/>
    <group-links :page-name="data.title" type="event-type"/>
    <br>
    <simple-content :description="data.description" />
    <br /><br /><br />
    <image-description-carousel
    :title="'Latest Events'"
      :myarray="data.latest_events"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-4"
    />
    <card-mosaic :items="data.rest_events"/>
  </div>
</template>

<script>
import CardMosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'
import ImageDescriptionCarousel from '~/components/carousels/ImageDescriptionCarousel.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import GroupLinks from '~/components/GroupLinks.vue'

export default {
  name: 'EventTypePage',
  components: {
    TopImage,
    SimpleContent,
    CardMosaic,
    ImageDescriptionCarousel,
    Breadcrumbs,
    GroupLinks,
  },
  async asyncData({ route, $axios, error }) {
    try{
    const { type } = route.params
    const { data } = await $axios.get('/api/' + type)

    return {
      data
    }
    }
    catch(e){
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.data.title.concat(" - VisitVenice"),
    }
  },
  mounted(){
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
    this.$data.data.restEvent.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[2].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  }
}
</script>
