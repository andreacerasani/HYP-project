<template>
  <div>
    <top-image :title="'Events'" :bg-img="'/images/events.jpg'" />
    <breadcrumbs page-name="events" link="/events"/>
    <carousel-img-des
      :title="'Upcoming Events'"
      :myarray="upcoming"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-4"
    />
    <hr>
    <description-card
      :title="title2022"
      :descr-img="descrImg2022"
      :description="description2022"
      :link-name="linkName2022"
      :link-path="linkPath2022"
      :is-left="false"
    />
    <description-card
      :title="titleSummer"
      :descr-img="descrImgSummer"
      :description="descriptionSummer"
      :link-name="linkNameSummer"
      :link-path="linkPathSummer"
    />
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
import CarouselImgDes from '../../components/carousels/ImageDescriptionCarousel.vue'
import TopImage from '~/components/utility/TopImage.vue'
import DescriptionCard from '~/components/main-elements/DescriptionCard.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default {
  name: 'EventsPage',
  components: {
    TopImage,
    DescriptionCard,
    CarouselImgDes,
    Breadcrumbs,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/page-info/eventsType')
    const upcomingEventsData = await $axios.get('/api/upcoming-events')
    const upcomingEvents = upcomingEventsData.data

    return {
      upcoming: upcomingEvents,
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
      descriptionWinter: data.Winter.description,
      linkNameWinter: data.Winter.linkName,
      linkPathWinter: data.Winter.linkPath,
    }
  },
  head() {
    return {
      title: "Events - VisitVenice",
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: 'All the events of the city of Venice',
        }
      ]
    }
  },
}
</script>
