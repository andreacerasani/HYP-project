<!-- Component with image all width with an img over it to handle the title of the page -->
<template>
  <div class="container-fluid container-img px-0">
    <div
      class="img-screen format-image"
      :style="{ 'background-image': 'url(' + bgImg + ')' }"
    ></div>
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
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.format-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
}
h1 {
  font-size: 12vmin;
  z-index: 1;
  color: var(--title-color);
  text-shadow: 0.3vw 0.3vw black;
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

.img-screen {
  height: 80vmin;
  object-fit: cover;
}
</style>
