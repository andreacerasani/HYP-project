<template>
  <span>
    <top-image :title-img="titleImg" :bg-img="bgImg" />
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

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .container-md {width: 95%;}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .container-md {width: 90%;}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .container-md {width: 80%;}
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .container-md {width: 70%;}
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .container-md {width: 60%;}
}
</style>