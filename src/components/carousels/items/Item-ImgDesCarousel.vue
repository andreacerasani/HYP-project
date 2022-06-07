<!-- Component to put inside a carousel with a single image with description and text on 
the right and a possible link  -->
<template>
  <div class=" p-3 mb-5 bg-body rounded my-border">
    <div class="row align-items-center flex-column flex-md-row ">
      <div class="col offset-md-1 py-3">
        <img :src="descrImg" class="rounded-3 img-fluid mx-auto d-block" />
      </div>

      <div class="col ms-txt text-center ">
        <div class="row pb-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row pb-4">
          <div>
            {{ limitDescription(description, 300) }}
          </div>
        </div>
        <div class="row justify-content-center pb-3">
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
.ms-txt {
  padding-right: 5%;
}
.my-button{
  color: var(--subtitle-color);
  border-color: var(--subtitle-color);
}
.my-button:hover{
  background-color: var(--subtitle-color);
  color: white;
}
.my-border {
  border-style: solid;
  border-color: var(--div-color-light);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 6;
}

</style>
