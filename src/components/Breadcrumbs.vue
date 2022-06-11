<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="link in createBread()" :key="link" class="breadcrumb-item" aria-current="page"><nuxt-link :to="link">{{link}}</nuxt-link></li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',
  props: {
    pageName: {
      type: String,
      required: true,
    },
  },

  data() {
    const basePages = [
      'events',
      'itineraries',
      'services',
      'points-of-interest',
      'city',
    ]
    return { basePages }
  },

  methods: {
    createBread() {
      if (process.client) {
        const breadJson = sessionStorage.getItem('bread')
        let breadArray
        if (breadJson == null) {
          breadArray = []
        } else {
          breadArray = JSON.parse(breadJson)
        }

        if (breadArray.includes(this.pageName)) {
          breadArray.splice(
            breadArray.indexOf(this.pageName) + 1,
            breadArray.length
          )
        } else if (this.pageName === 'home') {
          breadArray = ['home']
        } else if (this.$data.basePages.includes(this.pageName)) {
          breadArray = ['home']
          breadArray.push(this.pageName)
        } else {
          breadArray.push(this.pageName)
        }

        sessionStorage.setItem('bread', JSON.stringify(breadArray))

        if (breadArray.length <= 3) {
          return breadArray
        } else {
          return breadArray.slice(breadArray.length - 3)
        }
      }
    },
  },
}
</script>

<style scoped></style>
