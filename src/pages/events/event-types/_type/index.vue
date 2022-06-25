<template>
    <div>
        {{redirect(type)}}
    </div>
</template>
<script>
export default {
  name: 'EventTypeCurrentYearPage',
  asyncData({ route, $axios, error }) {
    return {
      type: route.params.type
    }
    },
  methods: {
    redirect(type) {
        this.$router.push('/events/event-types/'+ type + '/all')
    }
  }
}
</script>