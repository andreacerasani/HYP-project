<template>
  <div>
    <top-image :title="title" :bg-img="images[0].path" />
    <simple-content :description="description" />
    <div class="container-xl">
      <div
        class="p-4 pb-0 pe-lg-0 pt-lg-5 pb-lg-5 pe-lg-5 align-items-center rounded-3 border"
      >
        <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <div
            v-if="opening_hours != '00:00:00' || closing_hours != '00:00:00'"
          >
            <b>Opening hours:</b>
            <p class="lead">
              {{ opening_hours.substring(0, 5) }} -
              {{ closing_hours.substring(0, 5) }}
            </p>
          </div>
          <div v-if="ticket > 0">
            <b>Ticket:</b>
            <p class="lead">{{ ticket.toFixed(2) }} €</p>
          </div>
            <b>Contacts:</b>
            <p class="lead">
              landline phone: &emsp; &nbsp;   +39 {{ contact.landline_phone }} <br>
              mobile phone: &emsp;&emsp;    +39 {{ contact.mobile_phone }} <br>
              mail:   &emsp; &emsp; &emsp; &emsp; &emsp;        {{ contact.email }}
            </p>
          <div
            class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"
          >
            <button
              type="button"
              class="btn btn-outline-secondary btn-lg px-4"
              @click="backToList"
            >
              Back to list
            </button>
          </div>
        </div>
      </div>
    </div>
    <image-carousel :title="'See other images'" :num-of-carousel="1" :myarray="formatArray(images)" />
  </div>
</template>

<script>
import ImageCarousel from '../../components/carousels/ImageCarousel.vue'
import SimpleContent from '../../components/SimpleContent.vue'
import TopImage from '../../components/TopImage.vue'
export default {
  name: 'SinglePoiPage',
  components: { ImageCarousel, TopImage, SimpleContent },
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
      contact: poi.contact
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
