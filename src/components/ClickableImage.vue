<!-- Component that shows a clickable image with a title and an optional date, a trapezoid can be added on the right side setting it in the props.
Click on the image will bring to the given link -->
<template>
  <div class="cards">
    <nuxt-link id="foc" :to="link" >
      <div
        class="card-image"
        :style="{ 'background-image': 'url(' + img + ')' }"
      ></div>
      <div v-if="trapezoid" class="trapezoid"></div>
      <div id="card-body" class="p card-body">

        <div v-if="date !== null" id="date" class="card-title text-center">
          {{ formatDate(date) }}
        </div>
        <div class="card-title text-center">{{ name }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import common from '~/mixins/common.js'

export default {
  name: 'ClickableImage',
  mixins: [common],
  props: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
      default: null,
    },
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    trapezoid:{
      type: Boolean,
      required:false,
      default: false,
    }

  },
}
</script>

<style scoped>
#foc:focus > .card-image{
  -webkit-filter: brightness(100%);
  filter: brightness(100%);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.trapezoid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background: var(--subtitle-color) linear-gradient(to left, var(--subtitle-color), white);
  clip-path: polygon(50% 100%, 65% 0%, 100% 0%, 100% 100%);
  pointer-events: none;
}
.cards {
  position: relative;
  border: 4px solid var(--div-color-dark);
  border-radius: 3%;
  overflow: hidden;
  background-color: black;
}
.cards:hover {
  border: 4px solid var(--subtitle-color);
}
.card-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  -webkit-filter: brightness(50%);
  filter: brightness(70%);
}
.card-image:hover {
  -webkit-filter: brightness(100%);
  filter: brightness(100%);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.card-title {
  text-align: left;
  color: var(--title-color);
  text-shadow: 0.1vw 0.1vw black;
  pointer-events: none;
}
.card-body {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.p {
  font-weight: 550;
  font-size: 1.25em;
  font-variant: small-caps;
}
</style>
