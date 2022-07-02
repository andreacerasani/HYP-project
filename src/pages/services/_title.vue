<!-- Page that show a single service type with all its service points -->
<template>
  <div>
    <top-image :bg-img="img" :title="title" />
    <breadcrumbs :page-name="title" :link="$route.path" />
    <group-links :page-name="title" type="services" />
    <simple-content text-align="justify" :description="description" />
    <map-card :web-link="map" />
    <hr />
    <image-contacts
      v-for="(item, itemIndex) in items"
      :key="`service-${itemIndex}`"
      :img="item.image.path"
      :address="item.address"
      :closing-hours="item.closing_hours"
      :opening-hours="item.opening_hours"
      :is-left="itemIndex % 2 === 0"
      :phone="item.contact.landline_phone"
      :title="item.name"
    />
        <br /><br />
    <div class="text-center">
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center my-button"
        @click="backToServices"
      >
        Back to Services
      </button>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import GroupLinks from '~/components/GroupLinks.vue'
import ImageContacts from '~/components/main-elements/ImageContacts.vue'
import MapCard from '~/components/main-elements/MapCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'

export default {
  name: 'SingleServicePage',
  components: {
    TopImage,
    SimpleContent,
    ImageContacts,
    Breadcrumbs,
    MapCard,
    GroupLinks,
  },
  async asyncData({ route, $axios, error }) {
    try {
      const title = route.params.title
      const { data } = await $axios.get('/api/services/' + title)

      return {
        title: data.name,
        img: data.image.path,
        map: data.map,
        description: data.description,
        items: data.service_points,
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
          content: 'Information about ' + this.title + ', a service useful for a tourist in the city of Venice',
        },
      ],
    }
  },
  methods: {
    backToServices(){
      this.$router.push('/services')
    }
  }
}
</script>
