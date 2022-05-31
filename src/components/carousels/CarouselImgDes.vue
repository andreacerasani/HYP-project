<!-- Carusel with a single image with description and text on the right ->
 flow through different CarouselItemImgDes components  -->
<template>
  <div class="container-xl">
    <h1>{{ title }}</h1>
    <div
      :id="'carouselExampleIndicators' + numOfCarousel"
      class="carousel slide pt-2"
      data-bs-ride="true"
      data-bs-interval = "7500"
    >
      <div class="carousel-indicators">
        <button
          v-for="n in amountOfindicatorsNeeded"
          :key="n"
          type="button"
          :data-bs-target="'#carouselExampleIndicators' + numOfCarousel"
          :class="{ active: n == 1 }"
          :data-bs-slide-to="n - 1"
          :aria-label="'Slide' + n"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="n in amountOfindicatorsNeeded"
          :key="n"
          class="carousel-item"
          :class="{ active: n == 1 }"
        >
          <!-- -->
          <carousel-item-img-des 
          :descr-img="myarray[n-1].img" 
          :title="myarray[n-1].title"
          :description="myarray[n-1].description"
          :link-name="linkName"
          :link-path="myarray[n-1].linkPath"
           />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        :data-bs-target="'#carouselExampleIndicators' + numOfCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        :data-bs-target="'#carouselExampleIndicators' + numOfCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import CarouselItemImgDes from '~/components/carousels/CarouselItemImgDes.vue'
export default {
  name: 'CarouselImgDes',
  components: {
    CarouselItemImgDes,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    myarray: {
      type: Array, // img: contain path, title: title desc, description: contain description, linkPath: link path
      required: true,
    },
    linkName:{
      type: String,
      required: false,
      default: ''
    },
    numOfCarousel: {
      type: Number,
      required: true,
    },
  },
  data() {
    
    const length = this.myarray.length
    return {
      length,
    }
  },
  computed: {
    amountOfindicatorsNeeded() {
      return this.length
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
  color:var(--subtitle-color);
}
.carousel-control-prev,
.carousel-control-next {
  width: 5vw;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(100%);
}
.carousel-indicators [data-bs-target] {
  background-color: var(--button-carousel);
}
</style>
