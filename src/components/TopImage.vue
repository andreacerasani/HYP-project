<!-- Component with image all width with an img over it to handle the title of the page  -->

<template>
  <div class="container-fluid container-img px-0">
    <img :src="bgImg" class="img-fluid img-screen" />
    <div class="centered">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopImage',
  props: {
    bgImg: {
      type: String,
      required: true,
    },
    title:{
      type:String,
      required: true,
    },
  },
}
</script>

<style scoped>
h1{
  font-size: 10vw;
  z-index: 1;
  color: var(--title-color);
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.container-img {
  position: relative;
  text-align: center;
}
.img-inner {
  width: 70vw;
}

@media only screen and (max-width: 1500px) {
  .img-screen {
    height: 500px;
    object-fit: cover;
  }
}
@media only screen and (min-width: 1500px) {
  .img-screen {
    width: 100vw;
  }
}
</style>
