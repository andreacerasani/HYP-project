<template>
  <div>
    <top-image :title="'City'" :bg-img="bgImg" />
    <breadcrumbs page-name="City" link="city"/>
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
      :address="'Venice'"
      :show-button='false'
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
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default {
  name: 'CityPage',
  components: {
    DescriptionCard,
    MapCard,
    TopImage,
    SimpleContent,
    Breadcrumbs,
  },

  data() {
    const city = {
    Top: {
      bg_img: '/images/extra/homepage.jpg',
    },
    Map: {
      title: 'Venice',
    },
    History: {
      title: 'History',
      descrImg: '/images/history.jpg',
      description:
        'Venice is the symbol of wise government and freedom. The lagoon was its only defense, there were no palace guards except the Arsenal workers and no parade ground except the sea. During centuries of feudalism and barbarism, Venice symbolised democracy and civilization.',
      linkName: 'Discover More',
      linkPath: '/history',
    },
  }
  const { History, Map, Top } = city
    const titleH = History.title
    const descrImgH = History.descrImg
    const descriptionH = History.description
    const titleM = Map.title
    const bgImg = Top.bg_img
    const linkName = History.linkName
    const linkPath = History.linkPath
    return {
      titleH,
      descrImgH,
      descriptionH,
      titleM,
      bgImg,
      linkName,
      linkPath,
    }
  },
  head() {
    return {
      title: "City - VisitVenice",
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: "Map and History of Venice, a magical and spectacular city with a priceless art and history heritage"
        }
      ]
    }
  },
}
</script>
