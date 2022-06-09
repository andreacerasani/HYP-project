<template>
  <div>{{ createBread() }}</div>
</template>

<script>
export default {
  name: 'TheBreadcrumps',
  props: {
    pageName: {
      type: String,
      required: true,
    },
  },

  methods: {
    createBread() {
      if (process.client) {
        const breadJson = localStorage.getItem('bread')
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
        }else{
            breadArray.push(this.pageName)
        }
        localStorage.setItem('bread', JSON.stringify(breadArray))

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
