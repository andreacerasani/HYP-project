<template>
  <div class="container-xl">
    <div class="row p-3 align-items-center flex-column-reverse flex-md-row">
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
      <div class="col text-center">
        <img :src="descrImg" class="rounded-3 img-fluid" />
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
