<template>
  <a :href="link">
    <div class="card">
      <img :src="img" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text">
          {{ title }}
        </p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'CarouselItem',
  props: {
    img: {
      type: String,
      default: 'https://dummyimage.com/300x400/ff',
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    link:{
        type:String,
        default: '/city',
        required: true,
    }
  },
  data() {},
  computed: {},
}
</script>

<style scoped>
.card {
  border-bottom-right-radius: 3vw;
  width: 25%;
  border-bottom-left-radius: 3vw;
  margin-top: 2%;
  margin-bottom: 4%;
  margin-left: 6.2%;
  margin-right: 0;
  float: left;
  position: relative;
  background-color: black;
   box-shadow: 1vw 0.8vw 0.5vw rgb(170,170,170);
}
.card-text {
  text-align: center;
  color: white;
  font-size: 2vw;
}
.card:hover {
  transform: scale(1.05);
}
</style>
