<template>
  <div>
    <top-image :bg-img="img" :title="title" />
    <breadcrumbs :page-name="title" :link="$route.path"/>
    <simple-content
      :description="'Davide scrive la descrizione da bravo filosofo'"
    />
    <map-card :address="address" title="prova"/>
    <hr />
    <image-contacts
      v-for="(item, itemIndex) in items"
      :key="`service-${itemIndex}`"
      img="https://dummyimage.com/600x300"
      :address="item.address"
      :closing-hours="item.closing_hours"
      :opening-hours="item.opening_hours"
      :is-left="itemIndex%2 ===0 "
      :phone="item.contact.landline_phone"
      :title="item.name"
    />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import ImageContacts from '~/components/main-elements/ImageContacts.vue'
import MapCard from '~/components/main-elements/MapCard.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'

export default {
  name: 'SingleServicePage',
  components: { TopImage, SimpleContent, ImageContacts, Breadcrumbs, MapCard },
  async asyncData({ route, $axios, error }) {
    try{
    const title = route.params.title
    const { data } = await $axios.get('/api/services/' + title)

    return {
      title: data.name,
      img: data.image.path,
      items: data.service_points
    }
    }
    catch(e){
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data(){
    return{
      address: "https://www.google.com/maps/d/u/0/embed?mid=1qmgt64eJ4bsRPrK5boiyBN08Z694o60&ehbc=2E312F"
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
