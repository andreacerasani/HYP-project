<template>
  <span>
    <top-image :title="'Contact Us'" :bg-img="bgImg" />
    <simple-content :title="title" :description="description" />
    <div class="container-md">
      <ul class="list-group list-group-flush ">
        <li v-for="cat in catList" :key="cat.id" class="list-group-item">
          {{ cat.name }}
        </li>
      </ul>
    </div>
  </span>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import SimpleContent from '~/components/SimpleContent.vue'
export default {
  name: 'ContactPage',
  components: {
    TopImage,
    SimpleContent,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/multipleGets')
    const titleImg = data[1].title_img
    const bgImg = data[1].bg_img
    const title = data[1].title
    const description = data[1].description

    return {
      titleImg,
      bgImg,
      title,
      description,
      catList: data[0],
    }
  },
  data() {
    return {}
  },
}
</script>