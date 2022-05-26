<template>
  <div class="cards">
    <a :href="toUrl(name)">
      <div class="overflow-hide">
        <div
          class="card-img-top card-image"
          :style="{ 'background-image': 'url(' + img + ')' }"
        ></div>
      </div>
    </a>
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
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
}
.cards {
  border: 2px solid var(--div-color-dark);
  width: 16rem;
  padding: 0;
  background-color: var(--div-color-light);
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
  vertical-align: top;
  /* float: left; */
}
.cards:hover {
  border: 2px solid var(--subtitle-color);
}
.btn-custom {
  background-color: var(--div-color-dark);
  border: 2px solid var(--div-color-dark);
  color: var(--text-color);
  margin-bottom: 0;
}
.btn-custom:hover {
  background-color: white;
  border: 2px solid var(--subtitle-color);
  color: var(--text-color);
  bottom: 0px;
}
.card-image {
  padding-left: 0;
  padding-right: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 30vh;
}
.card-image:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.card-title{
  text-align: center;
  padding-bottom: 10px;
  padding-top:0px;
  margin-top:0px;
}
.card-body{
  min-height: 4vw;
  max-height: 4vw;
  overflow: hidden;
  padding-top:0px;
}
</style>
