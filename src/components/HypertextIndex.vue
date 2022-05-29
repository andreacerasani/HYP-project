<!-- Component that shows a list of hyperlinks to the bottom parts of the page -->
<template>
  <div class="container-xl">
    <div class="d-flex justify-content-center flex-wrap">
      <div
        v-for="(chapter, cIndex) in chapters"
        :key="`index-${cIndex}`"
      >
        <a :href="'#' + chapter.title">{{ chapter.title }}</a
        >&emsp; {{ dash(cIndex) }} &emsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HypertextIndex',
  props: {
    chapters: {
      type: Array,  // The array should contain a series of elements with the atrribute title -> it will be used as href and displayed
      required: true,
    },
  },
  methods: {
    dash(index) {
      if (index < this.chapters.length-1) {
        return '  -  '
      }
      return ''
    },
  },
}
</script>

<style scoped>
a {
  color: var(--subtitle-color);
}
</style>
