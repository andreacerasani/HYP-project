<!-- Component that shows a page of cards created from the items passed (each item can have title, img, link) -->
<template>
  <div>
    <div class="container-xl teo">
      <card
          v-for="(item, itemIndex) in items"
          :key="`service-index-${itemIndex}`"
          :name="item.title"
          :img="item.img"
        />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
/* import CarouselItem from '~/components/carousels/CarouselItem.vue' */
export default {
  name: 'CardMosaic',
  components: {
    /* CarouselItem, */
    Card,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.teo{
  /* display: flex; */
  /* justify-content:center; */
  text-align: center;
}
</style>
