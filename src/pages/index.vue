<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <p>HOME</p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
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
