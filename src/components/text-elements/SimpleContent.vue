<!-- Component with title and text that occupies all width of the page  -->
<template>
  <div>
    <h1 v-if="title !== ''">{{ title }}</h1>
    <div v-if="description !== ''">
      <div class="container-xl" style="white-space: pre-wrap">
        <hr />
          <p :style="'text-align: ' + textAlign">{{ description }}</p>
        <hr />
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
      default: 'left',
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
hr {
  height: 0.5vmax;
  background-color: var(--subtitle-color-light);
  border-radius: 5px;
}
</style>
