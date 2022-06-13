<!-- Component with a bigger image and a part of text on the right with title and 
description that when the img shrinks the text goes down   -->
<template>
  <div class="container-xl">
    <div class="row p-3 align-items-center flex-column flex-md-row">
      <div class="col text-center">
        <div class="ratio ratio-16x9">
          <!-- TODO: maybe we can use this for the itineraries <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1j1jtaD1ZMBgln-8d0QsdbLmBrzXm3sXU&ehbc=2E312F"></iframe> -->
          <map-component :address="address" />
        </div>
      </div>
      <div class="col text-center">
        <div class="row p-3">
          <h3><img src="/images/icons/location.png" /> {{ title }}</h3>
        </div>
        <div class="row p-2">
          <div v-if="showButton">
            <button
              type="button"
              class="btn btn-outline-secondary btn-lg px-4 center"
              @click="discoverMore"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import MapComponent from '../MapComponent.vue'
export default {
  name: 'MapCard',
  components: { MapComponent },
  props: {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    discoverMore() {
      this.$router.push('/points-of-interest/' + this.titleToLink(this.title))
    },
    titleToLink(title) {
      return title.replaceAll(' ', '-')
    },
  },
}
</script>

<style scoped>
p {
  color: var(--text-color);
}
h3 {
  color: var(--subtitle-color);
}
img {
  height: 3vh;
  min-height: 25px;
}
</style>
