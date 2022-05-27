<template>
  <div class="cards">
    <a :href="toUrl(name)">
      <div class="overflow-hide">
        <div style="position:relative;">
          <div
            class="card-img-top card-image"
            :style="{ 'background-image': 'url(' + img + ')' }"
          ></div>
          <span class="card-bodi">
            <h5 class="card-title">{{ name }}</h5>
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Card2Component',
  props: {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: false,
      default: 1,
    },
    breed: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    goToDetails() {
      this.$router.push(`/details/${this.id}`)
    },
    toUrl(name) {
      return '/points-of-interest/' + name.replaceAll(' ', '-') // Change this line -> directory should not be set here
    },
  },
}
</script>

<style scoped>
.overflow-hide {
  overflow: hidden;
  padding: 0;
}
.cards {
  border: 4px solid var(--div-color-dark);
  width: 16rem;
  padding: 0;
  background-color: var(--div-color-light);
  display: inline-block;
  vertical-align: top;
  /* float: left; */
}
.cards:hover {
  border: 4px solid var(--subtitle-color);
}
.card-image {
  padding-left: 0;
  padding-right: 0;
  margin: 0;
  padding: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 30vh;
  -webkit-filter: grayscale(60%); /* Safari 6.0 - 9.0 */
  filter: grayscale(60%);
}
.card-image:hover {
  -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
  filter: grayscale(0%);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.card-title {
  text-align: left;
  color: var(--title-color);
  text-shadow: 0.1vw 0.1vw black;
}
.card-bodi {
  position:absolute;
  top:5%;
  left:5%;
  width: 100%;
  height: 30%;
}
.card-bodi:hover {
}
</style>
