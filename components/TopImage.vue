<template>
  <div class="container-fluid container-img px-0">
    <img :src="bgImg" class="img-fluid" />
    <div class="centered">
      <img :src="titleImg" class="img-fluid"/>
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
</style>
