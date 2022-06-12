<template>
  <div>
    <top-image :title="nameItinerary" :bg-img="imageItinerary" />
    <breadcrumbs :page-name="nameItinerary" :link="$route.path"/>
    <simple-content :description="descriptionItinerary" />
    <map-card
      :title="'titleM'"
      :address="''"
    />
    <simple-content :title="'Points of Interest'" />
    <description-card
      v-for="(single, index) in pois"
      :key="index"
      :title="single.title"
      :descr-img="single.images[0].path"
      :description="single.description"
      :link-name="'Discover'"
      :link-path="'/'"
      :is-left="isLeft(index)"
    />
  </div>
</template>

<script>
import MapCard from '~/components/main-elements/MapCard.vue'
import TopImage from '~/components/utility/TopImage.vue'
import DescriptionCard from '~/components/main-elements/DescriptionCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default {
  name: 'ItinerarySingle',
  components: {
    TopImage,
    MapCard,
    DescriptionCard,
    SimpleContent,
    Breadcrumbs,
  },
  async asyncData({ route, $axios, error }) {
    try{
    const { title } = route.params

    const { data } = await $axios.get('/api/itineraries/' + title)
    
    return {
      nameItinerary: data.title,
      descriptionItinerary: data.description,
      imageItinerary: data.image.path,
      pois: data.pois,
    }
    }
    catch(e){
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data() {
    return {}
  },
  methods: {
    backToInieraries() {
      this.$router.push('/itineraries')
    },
    isLeft(index) {
      return index % 2 === 0
    },
  },
}
</script>
