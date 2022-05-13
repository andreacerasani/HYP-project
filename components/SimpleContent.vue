<template>
    <section>
        <h1 id="title">{{title}}</h1>
        <p id="description">{{description}}</p>
    </section>
</template>

<script>
export default {
  name: 'SimpleContent',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: false,
    }
  }
}
</script>

<style scoped>
#title, #description{
    padding-left: 20%;
    padding-bottom: 4%;
}

</style>