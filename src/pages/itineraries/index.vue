<template>
  <div>
    <top-image :bg-img="'images/itineraries.jpg'" :title="'Itineraries'" />
    <carousel-multi-element
      :title="'titleCarousel1'"
      :my-array="myArray1"
      :num-of-carousel="1"
    />
    <carousel-multi-element
      :title="'Title Carousel 2'"
      :my-array="myArray1"
      :num-of-carousel="2"
    />
  </div>
</template>

<script>
import CarouselMultiElement from '~/components/carousels/MultiElementCarousel.vue'
import TopImage from '~/components/utility/TopImage.vue'
export default {
  name: 'ItinerariesPage',
  components: {
    TopImage,
    CarouselMultiElement,
  },
  async asyncData({ $axios }) {
    // dati dal db
    const { data } = await $axios.get('/api/main-services')
    const { titleImg, bgImg, serviceList } = data
    // fine roba inutile per non dare errorri

    const titleCarousel1 = 'First Title'
    /*
        const myArray1=[]
        let i=0
        for(i=0; i<7; i++){
            myArray1.push({
                title: 'Itinerary '+i,
                imgSrc: 'https://dummyimage.com/200x300/11',
            })
        }
        */
    const myArray1 = serviceList
    return {
      titleImg,
      bgImg,
      titleCarousel1,
      myArray1,
    }
  },
}
</script>
