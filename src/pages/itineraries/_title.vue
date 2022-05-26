<template>
  <div>
    <top-image :title="nameItinerary" :bg-img="'https://dummyimage.com/1500x500'" />
    <simple-content :description="descriptionItinerary" />
    <map-card
      :title="'titleM'"
      :descr-img="'https://dummyimage.com/1000x600'"
      :description="'descriptionM'"
    />
    <simple-content :title="'Points of Interest'" />
    <description-card
      v-for="(single, index) in pois"
      :key="index"
      :title="single.title"
      :descr-img="single.images[0].path"
      :description="limitDescription(single.description, 400)"
      :link-name="'Discover'"
      :link-path="'/'"
      :is-left="isLeft(index)"
    />
  </div>
</template>

<script>
import MapCard from '~/components/MapCard.vue'
import TopImage from '~/components/TopImage.vue'
import DescriptionCard from '~/components/DescriptionCard.vue'
import SimpleContent from '~/components/SimpleContent.vue'
export default {
  name: 'ItinerarySingle',
  components: {
    TopImage,
    MapCard,
    DescriptionCard,
    SimpleContent,
  },
  async asyncData({ route, $axios }) {
    const { title } = route.params

    const { data } = await $axios.get('/api/itineraries/' + title)

    return {
      nameItinerary: data.title,
      descriptionItinerary: data.description,
      imageItinerary: data.image,
      pois: data.pois,
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
    limitDescription(str = '', num = 1) {
      const { length: len } = str
      if (num < len) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    },
  },
}
</script>
