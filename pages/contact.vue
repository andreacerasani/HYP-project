<template>
  <span>
    <top-image :title-img="titleImg" :bg-img="bgImg" />
    <simple-content :title="title" :description="description" />
    <ul>
      <li v-for="cat in catList" :key="cat.id">{{cat.name}}</li>
    </ul>
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
    const { data1 } = await $axios.get('/api/cats')
    const { data } = await $axios.get('/api/page-info/contactUs')
    const titleImg = data.title_img
    const bgImg = data.bg_img
    const title = data.title
    const description = data.description
    
    return {
      titleImg,
      bgImg,
      title,
      description,
      catList:data1,
    }
  },
  data() {
    return {}
  },
}
</script>
