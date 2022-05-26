<!-- Carusel with a single image full width text and description over it ->
 it doesn't use any other component  -->
<template>
  <div class="container-xl">
    <h1>{{ title }}</h1>
    <div
      :id="'carouselExampleCaptions' + numOfCarousel"
      class="carousel slide"
      data-bs-ride="false"
    >
      <div class="carousel-indicators">
        <button
          v-for="n in amountOfindicatorsNeeded"
          :key="n"
          type="button"
          :data-bs-target="'#carouselExampleCaptions' + numOfCarousel"
          :class="{ active: n == 1 }"
          :data-bs-slide-to="n - 1"
          :aria-label="'Slide' + n"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="n in amountOfindicatorsNeeded"
          :key="n"
          class="carousel-item w-100 image-force"
          :style="{ 'background-image': 'url(' + myArray[n - 1].img + ')' }"
          :class="{ active: n == 1 }"
        >
          <!-- per accedere fare myarray[n].img o .des o .tit
          <img
            :src="'https://dummyimage.com/1500x500'"
            class="d-block  cropped"
            alt=""
          />
          
          <div class="carousel-caption">
            <h5>{{ 'First slide label' + n }}</h5>
            <p>
              {{
                'Some representative placeholder content for the first slide.' +
                n
              }}
            </p>
          </div>
          -->
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        :data-bs-target="'#carouselExampleCaptions' + numOfCarousel"
        data-bs-slide="prev"
      >
      
        <span class="carousel-control-prev-icon cntered" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        :data-bs-target="'#carouselExampleCaptions' + numOfCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  props: {
    title: {
      type: String,
      required: true,
    },
    myArray: {
      // contains only img with the path to show
      type: Array,
      required: true,
    },
    numOfCarousel: {
      // numOfCarousel rappresent the index of carousel in the page, must be different in each carousel to make it work in page
      type: Number,
      required: true,
    },
  },
  data() {
    const myLenght = this.myArray.length
    return {
      myLenght,
    }
  },
  computed: {
    amountOfindicatorsNeeded() {
      return this.myLenght
    },
  },
}
</script>

<style scoped>
.image-force {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 80vh;
}
.cropped {
  height: 60vh;
  object-fit: cover;
}
h1 {
  text-align: center;
  color: var(--subtitle-color);
}
.carousel-control-prev,
.carousel-control-next {
  width: 5vw;
}
.carousel-control-prev,
.carousel-control-next {
  opacity:0.5;
  background-color: var(--div-color-light);
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity:0.8;
  background-color: var(--div-color-light);
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(100%);
}
.carousel-indicators [data-bs-target] {
  background-color: black;
}
</style>
