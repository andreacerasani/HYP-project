<template>
  <div>
    <top-image :bg-img="img" :title="title" />
    <simple-content
      :description="'Davide scrive la descrizione da bravo filosofo'"
    />
    <div class="container-xl">
      <img src="https://dummyimage.com/800x500" />
    </div>
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
import ImageContacts from '~/components/main-elements/ImageContacts.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import TopImage from '~/components/utility/TopImage.vue'

export default {
  name: 'SingleServicePage',
  components: { TopImage, SimpleContent, ImageContacts },
  async asyncData({ route, $axios }) {
    const title = route.params.title
    const { data } = await $axios.get('/api/services/' + title)

    return {
      title: data.name,
      img: data.image.path,
      items: data.service_points
    }
  },
}
</script>
