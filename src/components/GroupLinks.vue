<template>
  <div
    v-if="prev.title !== '' || next.title !== ''"
    class="row justify-content-between"
  >
    <div v-if="prev.title !== ''" class="col-auto me-auto">
      <a @click="linkClick('prev')">
        {{ prev.title }}
      </a>
    </div>
    <div v-if="next.title !== ''" class="col-auto ms-auto">
      <a @click="linkClick('next')">
        {{ next.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupLinks',

  props: {
    type: {
      type: String,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },

  data() {
    const prev = { title: '', linkPath: '/' }
    const next = { title: '', linkPath: '/' }
    const disableLink = false
    return { prev, next, disableLink }
  },

  mounted() {
    const linksJson = sessionStorage.getItem('groupLinks')
    let groupLinks = []
    if (linksJson == null || linksJson === 'undefined') {
      groupLinks = [
        { type: 'services', links: [] },
        { type: 'events', links: [] },
        { type: 'pois', links: [] },
        { type: 'itineraries', links: [] },
      ]
    } else {
      groupLinks = JSON.parse(linksJson)
    }

    if (groupLinks.length < 2) return

    const choosenGroup = groupLinks.filter((e) => e.type === this.type)[0].links

    const index = choosenGroup.findIndex((element) => {
      if (element.title === this.pageName) {
        return true
      }
      return false
    })

    let prev = this.$data.prev
    let next = this.$data.next

    if (index !== 0 && index !== choosenGroup.length - 1) {
      prev = choosenGroup[index - 1]
      next = choosenGroup[index + 1]
    } else if (index === 0) {
      if (choosenGroup.length === 2) {
        next = choosenGroup[index + 1]
      } else {
        prev = choosenGroup[choosenGroup.length - 1]
        next = choosenGroup[index + 1]
      }
    } else if (choosenGroup.length === 2) {
      prev = choosenGroup[index - 1]
    } else {
      next = choosenGroup[0]
      prev = choosenGroup[index - 1]
    }

    this.$data.next = next
    this.$data.prev = prev
    this.disableLink = false
  },

  methods: {
    linkClick(where) {
      if (process.client) {
        if (!this.disableLink) {
          this.disableLink = true

          const breadJson = sessionStorage.getItem('bread')
          let breadArray
          if (breadJson == null || breadJson === 'undefined') {
            breadArray = []
          } else {
            breadArray = JSON.parse(breadJson)
          }
          breadArray.pop()

          sessionStorage.setItem('bread', JSON.stringify(breadArray))

          if (where === 'prev') this.$router.push(this.prev.linkPath)
          else this.$router.push(this.next.linkPath)
        }
      }
    },
  },
}
</script>
