<!-- Component with title and text that stands alone all width of the page  -->

<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="description !== ''" class="my-border pt-3 mb-3">
      <div class="container-xl">
        <h5>
        <p :style="'text-align: ' + textAlign">{{ description }}</p>
        </h5>
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
.my-border {
  border-style: solid;
  border-color: var(--div-color-light);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 80vmax;
  margin: auto;
  width: 60%;
}
</style>
