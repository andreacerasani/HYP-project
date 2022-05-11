<template>
  <section>
    <img :src="image" class="card-img" style="width: 100%" />
    <div class="card-img-overlay">
      <h5 class="card-title text-center">
        <span id="middle">{{ title }}</span>
      </h5>
    </div>
    <p>{{ description }}</p>
  </section>
</template>

<script>
export default {
  name: 'InfoPage',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
section{
    margin:0;
    padding:0;
    border:0;
}
#middle {
  position: absolute;
  top: 45%;
}
.personalize {
  min-height: 700px;
}
</style>
