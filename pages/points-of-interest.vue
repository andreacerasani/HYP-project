<template>
  <div>
    <top-image
      :title-img="'https://dummyimage.com/800x200/ff'"
      :bg-img="'https://dummyimage.com/1500x500'"
    />
    <simple-content :description="'questa descrizione molto bella'" />

    <carousel-multi-element :title="titleCarousel1" :myarray="myArray1" :num-of-carousel="'1'" />
    
    <carousel-multi-element :title="'Title Carousel 2'" :myarray="myArray1" :num-of-carousel="'2'" />
  </div>
</template>

<script>
import SimpleContent from '~/components/SimpleContent.vue'
import TopImage from '~/components/TopImage.vue'
import CarouselMultiElement from '~/components/carousels/CarouselMultiElement.vue'
export default {
  name: 'PointsOfInterest',
  components: {
    TopImage,
    SimpleContent,
    CarouselMultiElement,
  },
  data() {
    return{}
  },
}
</script>
