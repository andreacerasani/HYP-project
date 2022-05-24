<template>
  <div>
    <top-image :title="'Evento'" :bg-img="'https://dummyimage.com/1500x500'" />
    <simple-content :description="'questa descrizione molto bella'" />
    <map-card
      :title="'titleM'"
      :descr-img="'https://dummyimage.com/1000x600'"
      :description="'descriptionM'"
    />

    <image-carousel :title="'Some images'" :myarray="myArray1" :num-of-carousel="'1'" />
  </div>
</template>

<script>
import ImageCarousel from '~/components/carousels/ImageCarousel.vue'
import MapCard from '~/components/MapCard.vue'
import SimpleContent from '~/components/SimpleContent.vue'
import TopImage from '~/components/TopImage.vue'

export default {
  name: 'EventSingle',
  components: {
    TopImage,
    SimpleContent,
    ImageCarousel,
    MapCard,
  },
  async asyncDat({ route, $axios }) {
    const { id } = route.params
    const { data } = await $axios.get('/api/events/' + id)
    const nameItinerary = data.name

    return {
      nameItinerary,
    }
  },

  data() {
    return {}
  },
  methods: {
    backToEvents() {
      this.$router.push('/events')
    },
  },
}
</script>
