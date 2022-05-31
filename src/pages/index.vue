<template>
    <p>
      HOME PAGE
    </p>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
  },
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
