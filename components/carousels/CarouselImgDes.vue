<template>
  <div class="container-xl">
    <h1>{{ title }}</h1>
    <div
      :id="'carouselExampleIndicators' + numOfCarousel"
      class="carousel slide container-xl"
      data-bs-ride="true"
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
          <description-card 
          :descr-img="'https://dummyimage.com/600x300'" 
          :description="'Ciao io sono una descrizione di '+n"
          :is-left="false"
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
import DescriptionCard from '~/components/DescriptionCard.vue'
export default {
  name: 'CarouselImgDes',
  components: {
    DescriptionCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    myarray: {
      type: Array,
      required: true,
    },
    numOfCarousel: {
      type: Number,
      required: true,
    },
  },
  data() {
    // const test=Math.ceil(this.myArray.length)
    const fintoNumero = 7
    return {
      // test,
      fintoNumero,
    }
  },
  computed: {
    amountOfindicatorsNeeded() {
      return Math.ceil(this.fintoNumero)
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
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
  background-color: black;
}
</style>
