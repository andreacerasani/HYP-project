<!-- Component with a bigger image and a part of text on the right with title and 
description that when the img shrinks the text goes down   -->
<template>
  <div class="container-xl">
    <div class="row p-3 align-items-center flex-column flex-md-row">
      <div class="col-md-8 text-center">
        <img :src="descrImg" class="rounded-3 img-fluid" />
      </div>
      <div class="col text-center">
        <div class="row p-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2">
          <div>
            <p>{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MapCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    descrImg: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
p{
  color:var(--text-color);
}
h3{
  color:var(--subtitle-color);
}
</style>