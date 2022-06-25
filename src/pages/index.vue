<template>
  <div>
    <div class="container-fluid">
      <div class="ratio ratio-21x9">
        <video autoplay loop>
          TODO: change this video
          <source src="video/videoDrone_short.mp4" type="video/mp4" />
          <!-- <source src="movie.ogg" type="video/ogg"> -->
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
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

<style scoped>

</style>
