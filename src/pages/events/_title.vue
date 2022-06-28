<template>
  <div>
    <top-image :title="data.title" :bg-img="data.images[0].path" />
    <breadcrumbs :page-name="data.title" :link="$route.path" />
    <group-links :page-name="data.title" type="events" />
    <br />
    <simple-content text-align="center" :description="data.description" />
    <br />
    <map-card
      :title="data.pois[0].title"
      :address="handleNull(data.pois[0].address)"
    />
    <br />
    <contacts
      :date="data.date"
      :email="data.contact.email"
      :landline-phone="data.contact.landline_phone"
      :mobile-phone="data.contact.mobile_phone"
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
      :my-array="formatArray(data.images)"
      :num-of-carousel="1"
    />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import ImageCarousel from '~/components/carousels/ImageCarousel.vue'
import GroupLinks from '~/components/GroupLinks.vue'
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
    GroupLinks,
  },
  async asyncData({ route, $axios, error }) {
    try {
      const { title } = route.params
      const { data } = await $axios.get('/api/events/' + title)

      return {
        data,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  methods: {
    backToEvents() {
      this.$router.push('/events')
    },
    formatArray(images) {
      const formatted = []
      for (const item of images.slice(0)) {
        formatted.push({
          img: item.path,
        })
      }
      return formatted
    },
    handleNull(address) {
      if (address != null) return address
      return this.data.pois[0].title.concat(', Venezia')
    },
  },
}
</script>
