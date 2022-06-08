<!-- Component to put inside a carousel with a single image with description and text on 
the right and a possible link  -->
<template>
  <div class="p-3 mb-5 bg-body rounded my-border">
    <div
      class="row custom-pad align-items-center justify-content-evenly flex-column flex-md-row overflow-hide"
    >
      <div
        class="col card-image rounded-3"
        :style="{ 'background-image': 'url(' + descrImg + ')' }"
      ></div>

      <div class="col text-center">
        <div class="row pb-2 pt-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row pb-4">
          <div>
            {{ limitDescription(description, 300) }}
          </div>
        </div>
        <div class="row justify-content-center">
          <span v-if="linkPath !== 'def'">
            <nuxt-link :to="linkPath">
              <button type="button" class="btn btn-outline-primary my-button">
                {{ linkName }}
              </button>
            </nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionCard',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    descrImg: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    linkName: {
      type: String,
      required: false,
      default: '',
    },
    linkPath: {
      type: String,
      required: false,
      default: 'def',
    },
    isLeft: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    limitDescription(str = '', num = 1) {
      const { length: len } = str
      if (num < len) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    },
  },
}
</script>

<style scoped>
.custom-pad{
  padding-left: 5% !important;
  padding-right: 5% !important
}
.my-button {
  color: var(--subtitle-color);
  border-color: var(--subtitle-color);
}
.my-button:hover {
  background-color: var(--subtitle-color);
  color: white;
}
.my-border {
  border-style: solid;
  border-color: var(--div-color-light);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 6;
}
.overflow-hide {
  overflow: hidden;
  padding: 0;
}
.card-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 25vmax;
}
</style>
