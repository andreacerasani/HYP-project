<!-- Component that shows a page of cards created from the items passed (each item can have title, img, linkPath, [date]) -->
<template>
  <div>
    <div class="container-xl" style="text-align: center;">
      <item
          v-for="(item, itemIndex) in items"
          :key="`service-index-${itemIndex}`"
          :name="item.title"
          :date="(item.hasOwnProperty('date')) ? item.date : null"
          :img="item.images[0].path"
          :link="item.linkPath"
        />
    </div>
  </div>
</template>

<script>
import item from './Item-Mosaic.vue'
export default {
  name: 'TheMosaic',
  components: {
    item,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>