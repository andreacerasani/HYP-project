<template>
  <div>
    <top-image :title="title" :bg-img="images[0].path" />
    <breadcrumbs :page-name="title" :link="$route.path" />
    <br />
    <simple-content :description="description" />
    <br />
    <map-card :title="poi.title" :address="handleNull(poi.address)" />
    <br />
    <contacts
      :date="date"
      :email="contact.email"
      :landline-phone="contact.landline_phone"
      :mobile-phone="contact.mobile_phone"
    />
    <br /><br />
    <div class="container-xl">
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center"
        @click="backToEvents"
      >
        Back to events
      </button>
    </div>
    <br /><br /><br />
    <image-carousel
      :title="'Gallery'"
      :my-array="formatArray(images)"
      :num-of-carousel="1"
    />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import ImageCarousel from '~/components/carousels/ImageCarousel.vue'
import Contacts from '~/components/main-elements/Contacts.vue'
import MapCard from '~/components/main-elements/MapCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'

export default {
  name: 'SingleEventPage',
  components: {
    TopImage,
    SimpleContent,
    ImageCarousel,
    MapCard,
    Contacts,
    Breadcrumbs,
  },
  async asyncData({ route, $axios, error }) {
    try{
    const { title } = route.params
    const { data } = await $axios.get('/api/events/' + title)
    const event = data
     
      return {
        title: event.title,
        description: event.description,
        date: event.date,
        ticket: event.ticket,
        address: event.address,
        poi: event.pois[0],
        images: event.images,
        contact: event.contact,
      }
    }
    catch(e){
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data() {
    return {}
  },
  methods: {
    backToEvents() {
      this.$router.push('/events')
    },
    formatArray(images) {
      const formatted = []
      for (const item of images.slice(1)) {
        formatted.push({
          img: item.path,
        })
      }
      return formatted
    },
    handleNull(address) {
      if (address != null) return address
      return this.poi.title.concat(", Venezia")
    },
  },
}
</script>
