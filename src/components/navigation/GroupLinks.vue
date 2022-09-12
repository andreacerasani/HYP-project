<!-- Component that create links to navigate between element of a group (next and prev) -->
<template>
  <div class="container-xl">
    <div
      v-if="prev.title !== '' || next.title !== ''"
      class="row justify-content-between size"
    >
      <!-- Previous Button -->
      <div
        class="col-auto btn btn-outline-primary my-button ms-1"
        :style="[
          prev.title !== ''
            ? { visibility: 'visible' }
            : { visibility: 'hidden' },
        ]"
        tabindex="0"
        @click="linkClick('prev')"
        @keypress="linkClick('prev')"
      >
        <span>
          <img
            src="images/icons/backwards.svg"
            class="icon-size"
            alt="backwards arrow"
          />
          <span class="d-none d-md-inline">{{ prev.title }}</span>
        </span>
      </div>
      <!-- Next Button -->
      <div
        class="col-auto btn btn-outline-primary my-button me-1"
        :style="[
          next.title !== ''
            ? { visibility: 'visible' }
            : { visibility: 'hidden' },
        ]"
        tabindex="0"
        @click="linkClick('next')"
        @keypress="linkClick('next')"
      >
        <span>
          <span class="d-none d-md-inline">{{ next.title }}</span>
          <img
            src="images/icons/forward.svg"
            class="icon-size"
            alt="forward arrow"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixins/common'
export default {
  name: 'GroupLinks',
  mixins: [common],
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
    return { prev, next }
  },

  mounted() {
    // Read group links from storage if any else create
    const groupLinks = this.retriveGroupLinks()

    // Read only the group link of the current page type
    const choosenGroup = groupLinks.filter((e) => e.type === this.type)[0].links

    // If only 1 element don't show links
    if (choosenGroup.length < 2) return

    // Find the position of the current page in the links array
    const index = choosenGroup.findIndex((element) => {
      if (element.title === this.pageName) {
        return true
      }
      return false
    })

    // Default prev and next
    let prev = this.$data.prev
    let next = this.$data.next

    // Choose the prev page and next page
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
  },

  methods: {
    linkClick(where) {
      if (process.client) {
        // Read the saved breadcrumbs from storage if any else create
        const breadJson = sessionStorage.getItem('bread')
        let breadArray
        if (breadJson == null || breadJson === 'undefined') {
          breadArray = []
        } else {
          breadArray = JSON.parse(breadJson)
        }

        // Remove last element if it was this page
        if (breadArray[breadArray.length - 1].pageName === this.pageName) {
          breadArray.pop()
          sessionStorage.setItem('bread', JSON.stringify(breadArray))
        }

        // Redirect to prev or next page
        if (where === 'prev') this.$router.push(this.prev.linkPath)
        else this.$router.push(this.next.linkPath)
      }
    },
  },
}
</script>

<style>
.icon-size {
  height: 30px;
  width: 30px;
}
</style>
