<!-- Component that shows a page of cards created from the items passed (each item can have title, img, link) -->
<template>
  <div>
    <div class="container-xl" style="text-align: center;">
      <card-2
          v-for="(item, itemIndex) in items"
          :key="`service-index-${itemIndex}`"
          :name="item.title"
          :img="item.img"
        />
    </div>
  </div>
</template>

<script>
// import Card from './Card.vue'
import Card2 from './Card2.vue'
/* import CarouselItem from '~/components/carousels/CarouselItem.vue' */
export default {
  name: 'CardMosaic',
  components: {
    /* CarouselItem, */
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