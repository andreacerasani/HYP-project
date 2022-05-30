<!-- Component with title and text that stands alone all width of the page  -->

<template>
    <div class="container-xl">
        <h1>{{title}}</h1>
        <p :style="'text-align: '+ textAlign">{{description}}</p>
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
    },
    textAlign:{
      type: String,
      default: "center",
      required: false
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
h1{
  color: var(--subtitle-color);
}
p{
  color:var(--text-color);
}
</style>