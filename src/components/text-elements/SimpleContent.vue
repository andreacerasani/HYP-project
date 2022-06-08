<!-- Component with title and text that stands alone all width of the page  -->

<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="description !== ''" class="horizontal-line pt-3 pb-2">
      <div class="container-xl">
        <p :style="'text-align: ' + textAlign">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleContent',
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
    textAlign: {
      type: String,
      default: 'justify',
      required: false,
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
}
h1 {
  color: var(--subtitle-color);
}
p {
  color: var(--text-color);
}
.horizontal-line {
  background-color: rgb(221, 217, 217);
  /* background-color: rgb(225, 252, 248); */
}
</style>
