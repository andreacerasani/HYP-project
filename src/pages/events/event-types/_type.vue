<template>
  <div>
    <top-image :title="title" :bg-img="bgImg" />
    <breadcrumbs :page-name="title" :link="$route.path"/>
    <br>
    <simple-content :description="description" />
    <br /><br /><br />
    <image-description-carousel
    :title="'Latest Events'"
      :myarray="latest_events"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-4"
    />
    <card-mosaic :items="rest_events"/>
  </div>
</template>

<script>
import CardMosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'
import ImageDescriptionCarousel from '~/components/carousels/ImageDescriptionCarousel.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'


export default {
  name: 'EventTypePage',
  components: {
    TopImage,
    SimpleContent,
    CardMosaic,
    ImageDescriptionCarousel,
    Breadcrumbs
    
  },
  async asyncData({ route, $axios, error }) {
    try{
    const { type } = route.params
    const { data } = await $axios.get('/api/' + type)
    const eventType = data

    return {
      title: eventType.title,
      description: eventType.description,
      bgImg: eventType.bgImg,
      latest_events:eventType.latest_events,
      rest_events:eventType.rest_events
    }
    }
    catch(e){
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.title.concat(" - VisitVenice"),
    }
  },
}
</script>
