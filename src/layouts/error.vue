<!-- Error Layout -->
<template>
  <div class="container">
    <br /><br />
    <description-card
      v-if="error.statusCode === 404"
      :descr-img="img"
      :title="title404"
      :description="description404"
      :link-name="linkName404"
      :link-path="linkPath"
    ></description-card>

    <description-card
      v-else
      :descr-img="img"
      :title="title"
      :description="descriptionGeneral"
      :link-name="linkName"
      :link-path="linkPath"
    ></description-card>
  </div>
</template>

<script>
import DescriptionCard from '../components/informative/DescriptionCard.vue'
export default {
  name: 'ErrorPage',
  components: { DescriptionCard },
  layout: 'defaultLayout',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  data() {
    const title404 = 'Page not found'
    const title = 'An error occurred'
    const img = 'images/extra/error_image.jpg'
    const linkName = 'Go back Home'
    const linkName404 = 'Continue Exploring'
    const linkPath = '/'
    const description404 = 'Please continue exploring this wonderful city'
    const descriptionGeneral =
      'Something unexpected happened, please report us the problem and we will solve it as soon as possible.'

    return {
      title404,
      title,
      img,
      linkName,
      linkName404,
      linkPath,
      description404,
      descriptionGeneral,
    }
  },
}
</script>

<style scoped>
.container {
  text-align: center;
}
img.resized {
  width: 300px;
  height: auto;
}
</style>
