<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col text-center">
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
            <nuxt-link :to="Link.path"> {{ Link.name }} </nuxt-link>
          </a>
        </div>
      </div>
      <div class="col p-5 text-center">
        <img :src="descrImg" class="rounded-3" />
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
      required: true,
    },
    descrImg: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Link: {
        name: 'Discover More',
        path: '/',
      },
    }
  },
}
</script>
