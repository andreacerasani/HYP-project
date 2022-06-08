<!-- Component that shows a page of cards created from the items passed (each item can have title, img, link) -->
<template>
  <div>
    <div class="container-xl" style="text-align: center;">
      <card-2
          v-for="(item, itemIndex) in items"
          :key="`service-index-${itemIndex}`"
          :name="item.title"
          :img="item.img"
          :link="item.linkPath"
        />
    </div>
  </div>
</template>

<script>
import Card2 from '../mosaics/Card2.vue'
export default {
  name: 'CardMosaic',
  components: {
    // Card,
    Card2,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>