<template>
  <div>
    <top-image :title-img="titleImg" :bg-img="bgImg" />
    <hr>
    <description-card
      :title="title2022"
      :descr-img="descrImg2022"
      :description="description2022"
      :link-name="linkName2022"
      :link-path="linkPath2022"
      :is-left="false"
    />
    <hr>
    <description-card
      :title="titleSummer"
      :descr-img="descrImgSummer"
      :description="descriptionSummer"
      :link-name="linkNameSummer"
      :link-path="linkPathSummer"
    />
    <hr>
    <description-card
      :title="titleWinter"
      :descr-img="descrImgWinter"
      :description="descriptionWinter"
      :link-name="linkNameWinter"
      :link-path="linkPathWinter"
      :is-left="false"
    />
  </div>
</template>

<script>
import TopImage from '~/components/TopImage.vue'
import DescriptionCard from '~/components/DescriptionCard.vue'
export default {
  name: 'EventsPage',
  components: {
    TopImage,
    DescriptionCard,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/eventsType')

    return {
      titleImg: data.Top.title_img,
      bgImg: data.Top.bg_img,
      title2022: data.All.title,
      descrImg2022: data.All.descrImg,
      description2022: data.All.description,
      linkName2022: data.All.linkName,
      linkPath2022: data.All.linkPath,
      titleSummer: data.Summer.title,
      descrImgSummer: data.Summer.descrImg,
      descriptionSummer: data.Summer.description,
      linkNameSummer: data.Summer.linkName,
      linkPathSummer: data.Summer.linkPath,
      titleWinter: data.Winter.title,
      descrImgWinter: data.Winter.descrImg,
      descriptionWinter: data.Summer.description,
      linkNameWinter: data.Winter.linkName,
      linkPathWinter: data.Winter.linkPath,
    }
  },
  data() {
    return {}
  },
}
</script>
