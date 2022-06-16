<template>
  <div>
    <top-image :title="title" :bg-img="images[0].path" />
    <breadcrumbs :page-name="title" :link="$route.path" />
    <br />
    <simple-content :description="description" />
    <br />
    <contacts
      :opening-hour="opening_hours"
      :closing-hour="closing_hours"
      :ticket="ticket"
      :mobile-phone="contact.mobile_phone"
      :landline-phone="contact.landline_phone"
      :email="contact.email"
    />
    <br /><br />
    <div class="container-xl">
    <h1>Location</h1>
    <br>
    <map-card :address="handleNull(address)" />
    <br><br>
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center"
        @click="backToList"
      >
        See all points of interest
      </button>
    </div>
    <br />
    <image-description-carousel
      v-if="events.length > 0"
      :title="'It\'s happening here'"
      :myarray="events"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-1"
    />
    <br /><br />
    <image-carousel
      :title="'Gallery'"
      :num-of-carousel="2"
      :my-array="formatArray(images)"
    />
  </div>
</template>

<script>
import ImageCarousel from '../../components/carousels/ImageCarousel.vue'
import SimpleContent from '../../components/text-elements/SimpleContent.vue'
import TopImage from '../../components/utility/TopImage.vue'
import Contacts from '~/components/main-elements/Contacts.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import ImageDescriptionCarousel from '~/components/carousels/ImageDescriptionCarousel.vue'
import MapCard from '~/components/main-elements/MapCard.vue'

export default {
  name: 'SinglePoiPage',
  components: {
    ImageCarousel,
    TopImage,
    SimpleContent,
    Contacts,
    Breadcrumbs,
    ImageDescriptionCarousel,
    MapCard,
  },
  async asyncData({ route, $axios, error }) {
    try{
    const title = route.params.title
    const { data } = await $axios.get('/api/points-of-interest/' + title)
    const poi = data
    const events = createArrayEvents(poi.events)
    return {
      title: poi.title,
      description: poi.description,
      opening_hours: poi.opening_hours,
      closing_hours: poi.closing_hours,
      ticket: poi.ticket,
      address: poi.address,
      images: poi.images,
      contact: poi.contact,
      events,
    }
    }
    catch(e){
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  methods: {
    formatArray(images) {
      const formatted = []
      for (const item of images.slice(1)) {
        formatted.push({
          img: item.path,
        })
      }
      return formatted
    },
    backToList() {
      this.$router.push('/points-of-interest')
    },
    handleNull(address) {
      if (address != null) return address
      return this.title.concat(", Venezia")
    },
  },
}
function createArrayEvents(events) {
  const filtered = []
  for (const element of events) {
    filtered.push({
      title: element.title,
      img: element.images[0].path,
      description: element.description,
      date: element.date,
      linkPath: '/events/' + element.title.replaceAll(' ', '-'),
    })
  }
  return filtered
}
</script>
<style scoped>
h1 {
  text-align: center;
  color: var(--subtitle-color);
}
</style>