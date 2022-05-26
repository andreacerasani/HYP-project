<!-- Component with title and text that stands alone all width of the page  -->

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
      default: "",    
      required: false,
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
h1{
  color: var(--title-color);
}
p{
  color:var(--text-color);
}
</style>