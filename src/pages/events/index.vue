<!-- Page that show the 3 different sub-category of events -->
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
    <!-- All events given a year -->
    <description-card
      :title="All.title"
      :descr-img="All.descrImg"
      :description="All.description"
      :link-name="All.linkName"
      :link-path="All.linkPath"
      :is-left="false"
    />
    <!-- All events that happen during the summer -->
    <description-card
      :title="Summer.title"
      :descr-img="Summer.descrImg"
      :description="Summer.description"
      :link-name="Summer.linkName"
      :link-path="Summer.linkPath"
    />
    <!-- All events that happen during the winter -->
    <description-card
      :title="Winter.title"
      :descr-img="Winter.descrImg"
      :description="Winter.description"
      :link-name="Winter.linkName"
      :link-path="Winter.linkPath"
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
    const upcomingEventsData = await $axios.get('/api/upcoming-events')
    const upcomingEvents = upcomingEventsData.data

    return {
      upcomingEvents,
    }
  },
  data() {
    return {
      All: {
        title: 'All ' + new Date().getFullYear() + ' events',
        descrImg: '/images/events/event-types/yearevents.jpg',
        description:
          'Discover all the fantastic events organized in the city of Venice during this year.\n Choose your favorites and plan your visit to Venice so you can have an unforgettable experience.\n Take part in the Venetian tradition or get carried away by the uniqueness that new events bring to the lagoon every year.',
        linkName: 'Discover More',
        linkPath: '/events/event-types/year-events/' + new Date().getFullYear(),
      },
      Summer: {
        title: 'Summer Events',
        descrImg: '/images/events/event-types/summerevents.jpg',
        description:
          "During the summer, Venice is colored in the brightest colors. Summer events range from the film festival to the famous Vogalonga. Be inspired by the cheerfulness of Venetians and relax while watching the reflections of the sunset on the water of the lagoon. It's never too late to enjoy a vacation.",
        linkName: 'Discover More',
        linkPath: '/events/event-types/summer-events/all',
      },
      Winter: {
        title: 'Winter Events',
        descrImg: '/images/events/event-types/winterevents.jpg',
        description:
          'In winter, the lagoon is filled with magic. Events such as Carnival, exhibitions and the marathon make Venice even more unique and unforgettable. Not to mention that the sea of the lagoon offers natural shelter from the cold of winter. ',
        linkName: 'Discover More',
        linkPath: '/events/event-types/winter-events/all',
      },
    }
  },
  head() {
    return {
      title: 'Events - VisitVenice',
      description: 'See all events in the city of Venice',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'All the main events in the city of Venice',
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

    let pageLinks = [
      { title: this.All.title, linkPath: this.All.linkPath },
      { title: this.Summer.title, linkPath: this.Summer.linkPath },
      { title: this.Winter.title, linkPath: this.Winter.linkPath },
    ]

    groupLinks[4].links = pageLinks

    pageLinks = []
    this.$data.upcomingEvents.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[1].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
}
</script>
