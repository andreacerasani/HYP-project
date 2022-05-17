<template>
  <div class="container-fluid">
    <div class="row align-items-center flex-column flex-md-row">
      <div class="col offset-md-1 py-3">
        <img :src="descrImg" class="rounded-3 img-fluid mx-auto d-block" />
      </div>

      <div class="col ms-txt text-center">
        <div class="row pb-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row pb-2">
          <div>
            {{ description }}
          </div>
        </div>
        <div class="row justify-content-center pb-3">
          <span v-if="linkPath !== 'def'">
            <nuxt-link :to="linkPath"> {{ linkName }} </nuxt-link>
          </span>
        </div>
      </div>
    </div>
    <hr />
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
}
</script>

<style scoped>
.ms-txt {
  padding-right: 5%;
}
</style>
