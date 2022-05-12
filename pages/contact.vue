<template>
  <top-image :title-img="titleImg" :bg-img="bgImg"/>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
export default {
  name: 'ContactPage',
  components: {
    TopImage,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/contactUs')
    const titleImg = data.title_img
    const bgImg = data.bg_img
    return {
      titleImg,
      bgImg,
    }
  },
  data() {
    return {}
  },
}
</script>


