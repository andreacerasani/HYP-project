<template>
  <iframe
    :src="`https://maps.google.com/maps?hl=en&amp;q=${address}&amp;ie=UTF8&amp;z=${zoom}&amp;output=embed`"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
  ></iframe>
</template>

<script>
export default {
  name: 'MapComponent',
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  data() {
    const zoom = 15
    return{
      zoom
    }
  },
  methods: {},
}
</script>
