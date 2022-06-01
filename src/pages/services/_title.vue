<template>
  <div>
    <top-image :bg-img="img" :title="title" />
    <simple-content
      :description="'Davide scrive la descrizione da bravo filosofo'"
    />
    <div class="container-xl">
      <img src="https://dummyimage.com/1500x500" />
    </div>
    <hr />
    <image-contacts
      v-for="(item, itemIndex) in items"
      :key="`service-${itemIndex}`"
      :img="item.img"
      :address="item.address"
      :closing-hours="item.closing_hours"
      :opening-hours="item.opening_hours"
      :is-left="true"
      :phone="item.landline_phone"
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
    const title = route.params
    const data = await $axios.get('/api/services/' + title)
    console.log(title)
    return {
      img: data.image,
      title: data.name,
      items: data.service_points,
    }
  },
}
</script>
