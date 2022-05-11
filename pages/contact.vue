<template>
  <info-page :title="title" :image="image" :description="description" />
</template>

<script>
import InfoPage from '~/components/InfoPage.vue'
export default {
  name: 'ContactPage',
  components: {
    InfoPage,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/contactUs')
    const title = data.title
    const image = data.image
    const description = data.description
    return {
      title,
      image,
      description,
    }
  },
  data() {
    return {}
  },
}
</script>


