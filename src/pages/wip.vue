<!-- Simple page shown when a page is still in Work in Progress -->
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
import DescriptionCard from '../components/informative/DescriptionCard.vue'
export default {
  name: 'WorkInProgressPage',
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
    const img = 'images/extra/patrick_wip.png'
    const linkName = 'Go back Home'
    const linkPath = '/'
    const description = 'This page is not yet completed, Please continue exploring this wonderful city'

    return {
      title,
      img,
      linkName,
      linkPath,
      description,
    }
  },
  head() {
    return {
      title: "Work In Progress",
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: "This page is not yet completed, please explore other pages of our website"
        }
      ]
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
