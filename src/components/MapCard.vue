<!-- Component with a bigger image and a part of text on the right with title and 
description that when the img shrinks the text goes down   -->
<template>
  <div class="container-xl">
    <div class="row p-3 align-items-center flex-column flex-md-row">
      <div class="col-md-8 text-center">
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1j1jtaD1ZMBgln-8d0QsdbLmBrzXm3sXU&ehbc=2E312F" width="640" height="480"></iframe>
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