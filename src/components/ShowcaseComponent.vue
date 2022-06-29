<template>
  <div class="outer">
    <div class="container-xl">
      <div class="row pt-5 align-items-center">
        <div class="col text-center">
          <h1>{{ title }}</h1>
        </div>
        <div class="col text-end pe-5">
          <nuxt-link :to="linkPath">
            <button type="button" class="btn">{{ linkName }}</button>
          </nuxt-link>
        </div>
      </div>

      <div class="row pt-3 pb-5 align-items-center">
        <div class="col-8 flex-container">
          <div class="ratio ratio-16x9">
            <clickable-image
              :img="content[0].img"
              :name="content[0].name"
              :link="'/events'"
              class="bigCard"
            />
          </div>
        </div>

        <div class="col-4 three-images">
          <div class="row">
            <div class="">
              <clickable-image
                :img="content[1].img"
                :name="content[1].name"
                :link="'/events'"
                class="smallCard number-1"
              />
            </div>
          </div>
          <div class="row">
            <div class="">
              <clickable-image
                :img="content[2].img"
                :name="content[2].name"
                :link="'/events'"
                class="smallCard number-2"
              />
            </div>
          </div>
          <div class="row">
            <div class="">
              <clickable-image
                :img="content[3].img"
                :name="content[3].name"
                :link="'/events'"
                class="smallCard number-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    linkName: {
      type: String,
      required: false,
      default: 'See all',
    },
    linkPath: {
      type: String,
      required: true,
    },
    content: {
      type: Array, // Array of at least 4 elements with name, img, (date)
      required: true,
    },
    isLeft: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style scoped>
.three-images{
  height: 60vh;
  position: relative;
}
.flex-container{
  position: relative;
  height: 60vh;
}
.bigCard {
  width: 90%; 
  height: 60vh;
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}
.smallCard{
  width: 80%;
  height: 18vh;
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}
.number-1{
  top: 1.5vh;
}
.number-2{
  top: 21vh;
}
.number-3{
  top: 40.5vh;
}
.outer {
  background: gainsboro;
}
h1 {
  color: var(--subtitle-color);
}
button {
  color: var(--subtitle-color);
  border-color: var(--subtitle-color);
  background: white;
}
button:hover {
  background-color: var(--subtitle-color);
  color: white;
}
</style>
