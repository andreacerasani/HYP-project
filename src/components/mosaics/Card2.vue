<template>
  <div class="cards">
    <nuxt-link :to="link">
      <div class="overflow-hide">
        <div style="position: relative">
          <div
            class="card-img-top card-image"
            :style="{ 'background-image': 'url(' + img + ')' }"
          ></div>
          <span class="card-bodi">
            <h5 class="card-title text-center">{{ name }}</h5>
          </span>
        </div>
      </div>
    </nuxt-link>
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
    link: {
      type: String,
      required: true,
    }
  },
  methods: {
    toUrl(link) {
      return this.$route.name+'/' + link.replaceAll(' ', '-')
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
  margin-bottom: 1vh;
  margin-left: 1vh;
  border-radius: 10%;
  overflow: hidden;
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
.card-bodi {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 30%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.card-bodi:hover {

}
</style>
