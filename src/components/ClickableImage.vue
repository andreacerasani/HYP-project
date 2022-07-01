<template>
  <div class="cards">
    <nuxt-link :to="link">
      <div
        class="card-image"
        :style="{ 'background-image': 'url(' + img + ')' }"
      ></div>
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
  },
}
</script>

<style scoped>
.cards {
  position: relative;
  border: 4px solid var(--div-color-dark);
  border-radius: 3%;
  overflow: hidden;
  background-color: var(--div-color-light);
}
.cards:hover {
  border: 4px solid var(--subtitle-color);
}
.card-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  -webkit-filter: brightness(50%); /* Safari 6.0 - 9.0 */
  filter: brightness(70%);
}
.card-image:hover {
  -webkit-filter: brightness(100%); /* Safari 6.0 - 9.0 */
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
  font-weight: bold;
  font-size: 1.25em;
  font-variant: small-caps;
}
</style>
