<!-- Component that shows a map, based on the props passed it redemension itself to the correct
width to have a title and button on the right or be a full screen map. 
The map can be made from an address or from a weblink.
When the img shrinks the text goes down
-->
<template>
  <div class="container-xl">
    <div v-if="title !== null">
      <div class="row p-3 align-items-center flex-column flex-md-row">
        <div class="col text-center">
          <div class="ratio ratio-16x9">
            <iframe
              :src="`https://maps.google.com/maps?hl=en&amp;q=${address}&amp;ie=UTF8&amp;z=${zoom}&amp;output=embed`"
            ></iframe>
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

    <div v-else-if="address == null" class="ratio ratio-21x9">
      <iframe :src="webLink" />
    </div>

    <div v-else class="ratio ratio-21x9">
      <iframe
        :src="`https://maps.google.com/maps?hl=en&amp;q=${address}&amp;ie=UTF8&amp;z=${zoom}&amp;output=embed`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapCard',
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    showButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    webLink: {
      type: String,
      required: false,
      default: null,
    },
    zoom:{
      type: Number,
      required: false,
      default: 15,
    }
  },
  data() {
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
