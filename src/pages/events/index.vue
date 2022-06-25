<template>
  <div>
    <top-image :title="'Events'" :bg-img="'/images/events.jpg'" />
    <breadcrumbs page-name="Events" link="/events" />
    <carousel-img-des
      :title="'Upcoming Events'"
      :myarray="upcomingEvents"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-4"
    />
    <hr />
    <description-card
      :title="data.All.title"
      :descr-img="data.All.descrImg"
      :description="data.All.description"
      :link-name="data.All.linkName"
      :link-path="data.All.linkPath"
      :is-left="false"
    />
    <description-card
      :title="data.Summer.title"
      :descr-img="data.Summer.descrImg"
      :description="data.Summer.description"
      :link-name="data.Summer.linkName"
      :link-path="data.Summer.linkPath"
    />
    <description-card
      :title="data.Winter.title"
      :descr-img="data.Winter.descrImg"
      :description="data.Winter.description"
      :link-name="data.Winter.linkName"
      :link-path="data.Winter.linkPath"
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
      upcomingEvents,
      data,
    }
  },
  head() {
    return {
      title: 'Events - VisitVenice',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'All the events of the city of Venice',
        },
      ],
    }
  },
  mounted() {
    const linksJson = sessionStorage.getItem('groupLinks')

    let groupLinks = []
    if (linksJson == null || linksJson === 'undefined') {
      groupLinks = [
        { type: 'services', links: [] },
        { type: 'events', links: [] },
        { type: 'pois', links: [] },
        { type: 'itineraries', links: [] },
        { type: 'event-type', links: [] },
      ]
    } else {
      groupLinks = JSON.parse(linksJson)
    }

    const pageLinks = [
      { title: this.data.All.title, linkPath: this.data.All.linkPath },
      { title: this.data.Summer.title, linkPath: this.data.Summer.linkPath},
      { title: this.data.Winter.title, linkPath: this.data.Winter.linkPath},
    ]

    groupLinks[4].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
}
</script>
