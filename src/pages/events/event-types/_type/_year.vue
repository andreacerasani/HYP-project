<template>
  <div>
    <top-image :title="data.title" :bg-img="data.bgImg" />
    <breadcrumbs :page-name="data.title" :link="$route.path" />
    <br />
    <simple-content text-align="center" :description="data.description" />
    <br />
    <div v-if="type === 'year-events'" class="container-xl text-center">
      <div class="dropdown">
        <a
          id="dropdownMenuLink"
          class="btn btn-lg btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select the Year
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" @click="yearClick('all')">All</a></li>
          <li>
            <a class="dropdown-item" @click="yearClick(curr_year)">{{
              curr_year
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="yearClick(curr_year + 1)">{{
              curr_year + 1
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <br /><br />
    <image-description-carousel
      :title="'Upcoming Events'"
      :myarray="data.upcoming_events"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-4"
    />
    <card-mosaic :items="data.all_events" />
  </div>
</template>

<script>
import CardMosaic from '~/components/mosaics/CardMosaic.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'
import ImageDescriptionCarousel from '~/components/carousels/ImageDescriptionCarousel.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  name: 'EventTypePage',
  components: {
    TopImage,
    SimpleContent,
    CardMosaic,
    ImageDescriptionCarousel,
    Breadcrumbs,
  },
  async asyncData({ route, $axios, error }) {
    try {
      const { type } = route.params
      const { year } = route.params
      const { data } = await $axios.get('/api/' + type + '/' + year)
      return {
        data,
        curr_year: new Date().getFullYear(),
        type: route.params.type,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.data.title.concat(' - VisitVenice'),
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

    const pageLinks = []
    this.$data.data.all_events.forEach((element) => {
      pageLinks.push({
        title: element.title,
        linkPath: element.linkPath,
      })
    })

    groupLinks[1].links = pageLinks

    sessionStorage.setItem('groupLinks', JSON.stringify(groupLinks))
  },
  methods: {
    yearClick(year) {
      if (process.client) {
        const breadJson = sessionStorage.getItem('bread')
        let breadArray
        if (breadJson == null || breadJson === 'undefined') {
          breadArray = []
        } else {
          breadArray = JSON.parse(breadJson)
        }
        breadArray.pop()

        sessionStorage.setItem('bread', JSON.stringify(breadArray))

        if (year === 'all') {
          this.$router.push('all')
        } else if (year === this.curr_year) {
          this.$router.push(String(this.curr_year))
        } else {
          this.$router.push(String(this.curr_year + 1))
        }
      }
    },
  },
}
</script>

<style scoped>
.btn {
  background-color: var(--subtitle-color);
}
</style>
