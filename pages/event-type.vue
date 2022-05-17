<template>
    <div>
        <top-image :title-img="'https://dummyimage.com/800x200/ff'" :bg-img="'https://dummyimage.com/1500x500'" />
        <simple-content :description="'This is a description of the itinerary Wonderfull place'" />
        <carousel-img-des :title="'Title carousel prova im'" :myarray="myArray1" :num-of-carousel="'1'" />
        <carousel-multi-element :title="'Title Carousel 1'" :myarray="myArray1" :num-of-carousel="'2'" />
    </div>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import SimpleContent from '~/components/SimpleContent.vue'
import CarouselMultiElement from '~/components/carousels/CarouselMultiElement.vue'
import CarouselImgDes from '~/components/carousels/CarouselImgDes.vue'

export default {
  name: 'EventType',
  components: {
    TopImage,
    SimpleContent,
    CarouselMultiElement,
    CarouselImgDes,
  },
  async asyncData({ route, $axios }) {
      const {id} = route.params
      const {data} = await $axios.get('/api/events/'+id)
      const nameItinerary=data.name

      return{
         nameItinerary,
      }
  },

  data() {

      return{}
  },
  methods: {
    backToEvents() {
      this.$router.push('/events')
    },
  },
}
</script>
