<template>
  <div>
    <top-image :title="title" :bg-img="images[0].path" />
    <br />
    <simple-content :description="description" />
    <br />
    <contacts
      :hour-opening="opening_hours"
      :hour-closing="closing_hours"
      :ticket="ticket"
      :phone-mobile="contact.mobile_phone"
      :phone-landline="contact.landline_phone"
      :email="contact.email"
    />
    <br /><br />
    <div class="container-xl">
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg px-4 center"
        @click="backToList"
      >
        Back to list
      </button>
    </div>
    <br /><br /><br />
    <image-carousel
      :title="'See other images'"
      :num-of-carousel="1"
      :my-array="formatArray(images)"
    />
  </div>
</template>

<script>
import ImageCarousel from '../../components/carousels/ImageCarousel.vue'
import SimpleContent from '../../components/SimpleContent.vue'
import TopImage from '../../components/TopImage.vue'
import Contacts from '~/components/Contacts.vue'
export default {
  name: 'SinglePoiPage',
  components: { ImageCarousel, TopImage, SimpleContent, Contacts },
  async asyncData({ route, $axios }) {
    const title = route.params.title
    const data = await $axios.get('/api/points-of-interest/' + title)
    const poi = data.data
    return {
      poi,
      title: poi.title,
      description: poi.description,
      opening_hours: poi.opening_hours,
      closing_hours: poi.closing_hours,
      ticket: poi.ticket,
      address: poi.address,
      images: poi.images,
      contact: poi.contact,
    }
  },
  head() {
    return {
      title: this.name,
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
    fromUrl(variable) {
      const result = variable.replaceAll('-', ' ')
      return result
    },
    backToList() {
      this.$router.push('/points-of-interest')
    },
  },
}
</script>

<style scoped>
/* button.btn{
  position: absolute;
  left: 50%;
} */
</style>
