<template>
  <div>
    <top-image :title="'History'" :bg-img="topImage" />
    <br />
    <hypertext-index :chapters="Chapters" />
    <br />
    <div v-for="(chapter, cIndex) in Chapters" :key="`chapter-index-${cIndex}`">
      <chapter
        :id="chapter.title"
        :title="chapter.title"
        :paragraphs="chapter.paragraphs"
      />
    </div>
  </div>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import ChapterComponent from '~/components/Chapter'
import HypertextIndex from '~/components/HypertextIndex.vue'
export default {
  name: 'CityPage',
  components: {
    TopImage,
    HypertextIndex,
    Chapter: ChapterComponent,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/history')

    const { topImage, Chapters } = data

    return {
      topImage,
      Chapters,
    }
  },
  data() {
    return {}
  },
}
</script>
