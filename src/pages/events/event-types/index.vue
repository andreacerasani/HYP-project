<!-- Redirect to the /events page -->
<template>
    <div>
        {{redirect()}}
    </div>
</template>
<script>
export default {
  name: 'EventTypesPage',
  methods: {
    redirect() {
        this.$router.push('/events')
    }
  }
}
</script>
