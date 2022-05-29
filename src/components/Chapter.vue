<template>
    <div class="container-xl">
        <div class="chapter">
        <h1>{{title}}</h1>
        <p v-for="(par, i) in paragraphs" :key="'p-index'+i">{{par}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ChapterComponent',
  props: {
    title: {
      type: String,
      default: "",    
      required: false,
    },
    paragraphs: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
h1{
  text-align: left;
}
h1{
  color: var(--subtitle-color);
}
p{
  color:var(--text-color);
  text-align: left;
}
</style>