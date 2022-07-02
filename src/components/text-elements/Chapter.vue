<!-- Component that can be used to display a chapter with a title and different paragraphs, with the possibility to add an image -->
<template>
  <div class="container-xl">
    <div class="chapter row">
      <div class="col-sm-12">
        <h1>{{ title }}</h1>
        <img
          v-if="image !== 'noImg'"
          :src="image"
          class="rounded-3 img-fluid float-md-end ps-4 pb-4 pt-2 pe-4"
          :alt="removePath(image)"
        />
        <div v-for="(par, i) in paragraphs" :key="'p-index' + i">
          <p>
            {{ par }}
          </p>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import common from '~/mixins/common'
export default {
  name: 'ChapterComponent',
  mixins: [common],
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    paragraphs: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      default: 'noImg',
      required: false,
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: left;
}
h1 {
  color: var(--subtitle-color);
}
p {
  color: var(--text-color);
  text-align: justify;
}
img {
  max-width: min(35em, 100%);

}
</style>
