<template>
  <div>
    <top-image :title="title" :bg-img="bgImg" />
    <breadcrumbs :page-name="title" :link="$route.path" />
    <br />
    <simple-content :description="description" />
    <br />
    <div v-if="type === 'year-events'" class="container-xl">
      <div class="dropdown">
        <a
          id="dropdownMenuLink"
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Year
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="all">All</a></li>
          <li>
            <a class="dropdown-item" :href="curr_year">{{
              curr_year
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" :href="curr_year + 1">{{ curr_year + 1}}</a>
          </li>
        </ul>
      </div>
    </div>
    <br /><br />
    <image-description-carousel
      :title="'Upcoming Events'"
      :myarray="upcoming_events"
      :link-name="'Discover More'"
      :num-of-carousel="1"
      class="pt-4"
    />
    <card-mosaic :items="all_events" />
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
      const eventType = data

      return {
        title: eventType.title,
        description: eventType.description,
        bgImg: eventType.bgImg,
        upcoming_events: eventType.upcoming_events,
        all_events: eventType.all_events,
        curr_year: new Date().getFullYear(),
        type: route.params.type,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.title.concat(' - VisitVenice'),
    }
  },
}
</script>

<style scoped>
.btn{
  background-color: var(--subtitle-color);
}
</style>

