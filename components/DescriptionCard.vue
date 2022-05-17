<template>
  <div class="container-xl">
    <div
      class="row p-3 align-items-center"
      :class="{
        'flex-column-reverse flex-md-row': isLeft,
        'flex-column flex-md-row': !isLeft,
      }"
    >
      <div v-if="isLeft" class="col text-center">
        <div class="row p-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2">
          <div>
            {{ description }}
          </div>
        </div>
        <div class="row justify-content-center p-3">
          <a class="btn">
            <nuxt-link :to="linkPath"> {{ linkName }} </nuxt-link>
          </a>
        </div>
      </div>

      <div class="col text-center">
        <img :src="descrImg" class="rounded-3 img-fluid" />
      </div>

      <div v-if="!isLeft" class="col text-center">
        <div class="row p-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2">
          <div>
            {{ description }}
          </div>
        </div>
        <div class="row justify-content-center p-3">
          <a class="btn">
            <nuxt-link :to="linkPath"> {{ linkName }} </nuxt-link>
          </a>
        </div>
      </div>
    </div>
    <hr>
  </div>
  
</template>

<script>
export default {
  name: 'DescriptionCard',
  props: {
    title: {
      type: String,
      required: false,
      default:'',
    },
    descrImg: {
      type: String,
      required: false,
      default:'',
    },
    description: {
      type: String,
      required: false,
      default:'',
    },
    linkName: {
      type: String,
      required: false,
      default:'',
    },
    linkPath: {
      type: String,
      required: false,
      default:'',
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
