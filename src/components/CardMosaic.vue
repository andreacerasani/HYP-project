<!-- Component that shows a page of cards created from the items passed (each item can have title, img, link) -->
<template>
  <div>
    <div class="page container mt-5">
      <div class="row mt-3">
        <card
          v-for="(item, itemIndex) in items"
          :key="`service-index-${itemIndex}`"
          :name="item.title"
          :img="item.img"
          class="col-sm-2 m-2"
        />
      </div>
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
/* .container {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: flex-start;
}
.item{
  flex: none;
  align-self:stretch;
} */
</style>
