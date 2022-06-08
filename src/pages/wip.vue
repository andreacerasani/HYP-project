<template>
  <div class="container">
    <br>
    <br>
    <description-card
      :descr-img="img"
      :title="title"
      :description="description"
      :link-name="linkName"
      :link-path="linkPath"
    ></description-card>
  </div>
</template>

<script>
import DescriptionCard from '../components/main-elements/DescriptionCard.vue'
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
    const title = 'Page Under Construction'
    const img = '/images/extra/patrick_wip.png'
    const linkName = 'Go back Home'
    const linkPath = '/'
    const description = 'Please continue exploring this wonderful city'

    return {
      title,
      img,
      linkName,
      linkPath,
      description,
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
