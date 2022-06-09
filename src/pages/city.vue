<template>
  <div>
    <top-image :title="'City'" :bg-img="bgImg" />
    <breadcrumps page-name="city" />
    <br>
    <div class="text-center">
      <a href="#Map"> Map</a> -
      <a href="#History"> History </a>
    </div>
    <br>
    <simple-content :description="'Few cities can claim such a priceless art and history heritage as Venice. This unique city with its magical, spectacular scenery is not just beautiful; it is a real miracle of creative genius: a city built on mud, sand and the slime of a difficult, inhospitable landscape.'"/>
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
import TopImage from '~/components/utility/TopImage.vue'
import DescriptionCard from '~/components/main-elements/DescriptionCard.vue'
import MapCard from '~/components/main-elements/MapCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Breadcrumps from '~/components/Breadcrumps.vue'
export default {
  name: 'CityPage',
  components: {
    DescriptionCard,
    MapCard,
    TopImage,
    SimpleContent,
    Breadcrumps,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/city')

    const { History, Map, Top } = data
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
