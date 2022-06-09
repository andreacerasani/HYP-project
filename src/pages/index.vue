<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <p>HOME</p>
    <breadcrumps page-name="home"/>
  </div>
</template>

<script>
import Breadcrumps from '~/components/Breadcrumps.vue'
export default {
  name: 'IndexPage',
  components: {Breadcrumps},
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
