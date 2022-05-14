<template>
    <description-card :title="title" :descr-img="descrImg" :description="description"/>
</template>

<script>
import DescriptionCard from '~/components/DescriptionCard.vue'
export default {
  name: 'CityPage',
  components: {
    DescriptionCard,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/city')
    const title = data.title
    const descrImg = data.descrImg
    const description = data.description
    return {
      title,
      descrImg,
      description,
    }
  },
  data() {
    return {}
  },
}
</script>

