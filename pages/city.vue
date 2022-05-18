<template>
  <div>
    <top-image :title-img="titleImg" :bg-img="bgImg" />
    <div class="text-center">
      <a href="#Map"> map </a>
      <a href="#History"> history </a>
    </div>
    <map-card
      id="Map"
      :title="titleM"
      :descr-img="descrImgM"
      :description="descriptionM"
    />
    <description-card
      id="History"
      :title="titleH"
      :descr-img="descrImgH"
      :description="descriptionH"
      :link-name="linkName"
      :link-path="linkPath"
    />
  </div>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import DescriptionCard from '~/components/DescriptionCard.vue'
import MapCard from '~/components/MapCard.vue'
export default {
  name: 'CityPage',
  components: {
    DescriptionCard,
    MapCard,
    TopImage,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/city')

    const {History, Map, Top} = data
    const titleH = History.title
    const descrImgH = History.descrImg
    const descriptionH = History.description
    const titleM = Map.title
    const descrImgM = Map.descrImg
    const descriptionM = Map.description
    const titleImg = Top.title_img
    const bgImg = Top.bg_img
    const linkName = History.linkName
    const linkPath = History.linkPath

    return {
      titleH,
      descrImgH,
      descriptionH,
      titleM,
      descrImgM,
      descriptionM,
      titleImg,
      bgImg,
      linkName,
      linkPath,
    }
  },
  data() {
    return {}
  },
}
</script>
