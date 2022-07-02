<!-- Component that represent a mosaic item -->
<template>
  <div class="cards">
    <nuxt-link :to="link">
      <div class="overflow-hide">
        <div style="position: relative">
          <div
            class="card-image"
            :style="{ 'background-image': 'url(' + img + ')' }"
          ></div>
          <span
            :class="{
              'card-body-date': date !== null,
              'card-body': date == null,
            }"
          >
            <h6 v-if="date !== null" class="card-date text-center">
              {{ formatDate(date) }}
            </h6>
            <h5 class="card-title text-center">
              {{ name }}
            </h5>
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import common from '~/mixins/common.js'

export default {
  name: 'Card2Component',
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
.overflow-hide {
  overflow: hidden;
  padding: 0;
}
.cards {
  border: 4px solid var(--div-color-dark);
  width: 18rem;
  padding: 0;
  margin-bottom: 1vh;
  margin-left: 1vh;
  border-radius: 10%;
  overflow: hidden;
  background-color: var(--div-color-light);
  display: inline-block;
  vertical-align: top;
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
  height: 16rem;
  -webkit-filter: brightness(50%); /* Safari 6.0 - 9.0 */
  filter: brightness(70%);
}
.card-image:hover {
  -webkit-filter: brightness(100%); /* Safari 6.0 - 9.0 */
  filter: brightness(100%);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.card-date {
  text-align: left;
  font-size: 1.2rem;
  color: var(--title-color);
  text-shadow: 0.1vw 0.1vw black;
  pointer-events: none;
}
.card-title {
  text-align: left;
  font-size: 2rem;
  color: var(--title-color);
  text-shadow: 0.1vw 0.1vw black;
  pointer-events: none;
}
.card-body {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 100%;
  height: 20%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.card-body-date {
  position: absolute;
  top: 35%;
  left: 50%;
  width: 100%;
  height: 20%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
