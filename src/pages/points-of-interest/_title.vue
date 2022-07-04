<!-- Page that show a single point of interest informations -->
<template>
  <div>
    <top-image :title="data.title" :bg-img="data.images[0].path" />
    <breadcrumbs :page-name="data.title" :link="$route.path" />
    <group-links :page-name="data.title" type="pois" />
    <br />
    <simple-content text-align="justify" :description="data.description" />
    <br />
    <contacts
      :opening-hour="data.opening_hours"
      :closing-hour="data.closing_hours"
      :ticket="data.ticket"
      :mobile-phone="data.contact.mobile_phone"
      :landline-phone="data.contact.landline_phone"
      :email="data.contact.email"
    />
    <br /><br />
    <div class="container-xl text-center">
      <h1>Location</h1>
      <br />
      <map-card :address="handleNull(data.address)" />
      <br /><br />
    </div>
    <!-- Events in this point of interest -->
    <image-description-carousel
      v-if="data.events.length > 0"
      :title="'It\'s happening here'"
      :elements-to-show="data.events"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-1"
    />
    <br />
    <br />
    <!-- Itineraries where this point of interest is involved -->
    <image-description-carousel
      v-if="data.itineraries.length > 0"
      :title="'Plan your trip'"
      :elements-to-show="data.itineraries"
      :link-name="'Discover More'"
      :num-of-carousel="2"
      class="pt-1"
    />
    <br /><br />
    <image-carousel
      :title="'Gallery'"
      :num-of-carousel="2"
      :elements-to-show="formatArray(data.images)"
    />
    <br /><br />
    <div class="text-center">
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center my-button"
        @click="backToList"
      >
        Back to Points of Interest
      </button>
    </div>
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
import GroupLinks from '~/components/GroupLinks.vue'
import common from '~/mixins/common'

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
    GroupLinks,
  },
  mixins:[common],
  async asyncData({ route, $axios, error }) {
    try {
      const title = route.params.title
      const { data } = await $axios.get('/api/points-of-interest/' + title)

      data.events.forEach((e) => {
        e.linkPath = '/events/' + e.title.replaceAll(' ', '-')
      })

      const itineraries = []

      data.itineraries.forEach((i) => {
        itineraries.push({
          title: i.title,
          images: [i.image],
          description: i.description,
          linkPath: '/itineraries/' + i.title.replaceAll(' ', '-'),
        })
      })

      data.itineraries = itineraries

      return {
        title,
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
          content: 'Information about ' + this.data.title + ', a point of interest in the city of Venice',
        },
      ],
    }
  },
  mounted() {
    const groupLinks = this.retriveGroupLinks()

    let pageLinks = []
    this.$data.data.events.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[1].links = pageLinks

    pageLinks = []
    this.$data.data.itineraries.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[3].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
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
      return this.title.concat(', Venezia')
    },
  },
}
</script>
<style scoped>
h1 {
  text-align: center;
  color: var(--subtitle-color);
}
</style>
