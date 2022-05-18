<!-- Component with image all width with an img over it to handle the title of the page  -->

<template>
  <div class="container-fluid container-img px-0">
    <img :src="bgImg" class="img-fluid img-screen" />
    <div class="centered">
      <img :src="titleImg" class="img-inner" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopImage',
  props: {
    titleImg: {
      type: String,
      required: true,
    },
    bgImg: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
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
