<!-- Page that show all the informations of a specific event -->
<template>
  <div>
    <top-image :title="data.title" :bg-img="data.images[0].path" />
    <breadcrumbs :page-name="data.title" :link="$route.path" />
    <group-links :page-name="data.title" type="events" />
    <br />
    <simple-content text-align="justify" :description="data.description" />
    <br />
    <!-- Shown the point of interest where the event take place -->
    <map-card
      :title="data.poi.title"
      :address="handleNull(data.poi.address)"
    />
    <br />
    <contacts
      :date="data.date"
      :email="data.contact.email"
      :landline-phone="data.contact.landline_phone"
      :mobile-phone="data.contact.mobile_phone"
    />
    <br /><br />
    <image-carousel
      :title="'Gallery'"
      :my-array="formatArray(data.images)"
      :num-of-carousel="1"
    />
    <br /><br />
    <div class="text-center">
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center my-button"
        @click="backToEvents"
      >
        Back to events
      </button>
    </div>
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
import common from '~/mixins/common'

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
  mixins:[common],
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
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Information about ' +
            this.data.title +
            ', event that takes place at ' +
            this.data.poi.title,
        },
      ],
    }
  },
  mounted() {
    const groupLinks = this.retriveGroupLinks()

    const pageLinks = [{
      title: this.$data.data.poi.title,
      linkPath: '/point-of-interest/' + this.$data.data.poi.title.replaceAll(' ', '-'),
    }]

    groupLinks[2].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
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
      return this.data.poi.title.concat(', Venezia')
    },
  },
}
</script>
