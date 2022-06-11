<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <p>HOME</p>
    <breadcrumbs page-name="home"/>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default {
  name: 'IndexPage',
  components: {Breadcrumbs},
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/index')
    const title = data.title
    const image = data.image
    const description = data.description
    return {
      title,
      description,
      image,
    }
  },
}
</script>
