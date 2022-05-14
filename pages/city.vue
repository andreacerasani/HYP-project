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
    />
  </div>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import DescriptionCard from '~/components/cityComponents/DescriptionCard.vue'
import MapCard from '~/components/cityComponents/MapCard.vue'
export default {
  name: 'CityPage',
  components: {
    DescriptionCard,
    MapCard,
    TopImage,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/city')

    const titleH = data.History.title
    const descrImgH = data.History.descrImg
    const descriptionH = data.History.description
    const titleM = data.Map.title
    const descrImgM = data.Map.descrImg
    const descriptionM = data.Map.description
    const titleImg = data.Top.title_img
    const bgImg = data.Top.bg_img

    return {
      titleH,
      descrImgH,
      descriptionH,
      titleM,
      descrImgM,
      descriptionM,
      titleImg,
      bgImg,
    }
  },
  data() {
    return {}
  },
}
</script>
