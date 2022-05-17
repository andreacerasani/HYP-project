<template>
  <div>
    <top-image :title-img="'https://dummyimage.com/800x200/ff'" :bg-img="'https://dummyimage.com/1500x500'" />
    <simple-content :description="'This is a description of the itinerary \nWonderfull place'"/>
    <map-card
      :title="'titleM'"
      :descr-img="'https://dummyimage.com/1000x600'"
      :description="'descriptionM'"
    />
    <simple-content :title="'POI'" />
    <description-card 
        v-for="single in pois" :key="single.id"
      :title="single.name"
      :descr-img="single.img"
      :description="single.desc"
      :link-name="'About POI'"
      :link-path="'/'"
      :is-left="single.isEven"
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
      const {id} = route.params
      const {data} = await $axios.get('/api/itineraries/'+id)
      const nameItinerary=data.name
      const poi =[]
      return{
         nameItinerary,
         poi,
      }
  },

  data() {
      const pois=[]
      let i=0
      for(i=0; i<6; i++){
          pois.push({
              if: i,
              name: "poi N "+i,
              desc: "this is a description of "+ i,
              img: "https://dummyimage.com/600x300",
              isEven: !(i%2),
          })
      }
      return{pois}
  },
  methods: {
    backToInieraries() {
      this.$router.push('/itineraries')
    },
  },
}
</script>



