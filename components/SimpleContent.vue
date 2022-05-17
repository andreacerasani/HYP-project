<template>
    <div class="container-md">
        <h1>{{title}}</h1>
        <p>{{description}}</p>
    </div>
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
h1, p{
  text-align: center;
}
</style>