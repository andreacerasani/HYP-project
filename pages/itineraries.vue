<template>
  <div>
    <top-image :title-img="titleImg" :bg-img="bgImg" />
    <carousel-multi-element :title="titleCarousel1" :myarray="myArray1" :num-of-carousel="'1'" />
    <hr>
    <carousel-multi-element :title="'Title Carousel 2'" :myarray="myArray1" :num-of-carousel="'2'" />
    <hr>
  </div>
</template>

<script>
import CarouselMultiElement from '~/components/carousels/CarouselMultiElement.vue'
import TopImage from '~/components/TopImage.vue'
export default {
  name: 'ItinerariesPage',
  components: {
    TopImage,
    CarouselMultiElement,
  },
  async asyncData({ $axios }) {
      // dati dal db
      const { data } = await $axios.get('/api/multipleGets')
      // fine roba inutile per non dare errorri

      const titleImg= 'https://dummyimage.com/800x200/ff'
      const bgImg= 'https://dummyimage.com/1500x500'
        const titleCarousel1 ='First Title'
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
        const myArray1= data[0]
      return{
          titleImg,
          bgImg,
          titleCarousel1,
          myArray1, 
      }
  },
}
</script>
