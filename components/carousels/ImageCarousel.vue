<!-- Carusel with a single image full width text and description over it ->
 it doesn't use any other component  -->
<template>
  <div>
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
          <!-- per accedere fare myarray[n].img o .des o .tit-->
          <img
            src="https://dummyimage.com/1600x500"
            class="d-block w-100 cropped"
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
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        :data-bs-target="'#carouselExampleCaptions' + numOfCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
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
    const numOfPic = 5
    return {
      numOfPic,
    }
  },
  computed: {
    amountOfindicatorsNeeded() {
      return Math.ceil(this.numOfPic)
    },
  },
}
</script>

<style scoped>
.cropped {
  height: 60vh;
  object-fit: cover;
}
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
