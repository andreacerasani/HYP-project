<!-- Component that create dinamic breadcrumbs links based on the path that the user took on the website -->
<template>
  <div class="container-xl">
    <nav
      style="--bs-breadcrumb-divider: '>'"
      aria-label="breadcrumb"
      class="ms-3 pt-2"
    >
      <ol class="breadcrumb">
        <template v-for="(item, index) in createBread()">
          <li
            v-if="item.pageName !== pageName"
            :key="index"
            class="breadcrumb-item fs-4"
            :class="[index === breadLength - 2 ? '' : 'd-none d-lg-block']"
            aria-current="page"
            @click="retriveLinks(item.pageName)"
          >
            <nuxt-link :to="item.link"> {{ item.pageName }}</nuxt-link>
          </li>
          <li
            v-else
            :key="index"
            class="breadcrumb-item active d-none d-lg-block fs-4"
            aria-current="page"
          >
            {{ item.pageName }}
          </li>
        </template>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',
  props: {
    pageName: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },

  data() {
    const basePages = [
      'Events',
      'Itineraries',
      'Services',
      'Points Of Interest',
      'City',
      'Contact Us',
    ]
    const breadLength = 0
    return { basePages, breadLength }
  },

  methods: {
    createBread() {
      if (process.client) {
        const pageInfo = {
          pageName: this.pageName,
          link: this.link,
          groupLinks: sessionStorage.getItem('groupLinks'),
        }

        // Read the saved breadcrumbs from storage if any else create
        const breadJson = sessionStorage.getItem('bread')
        let breadArray
        if (breadJson == null || breadJson === 'undefined') {
          breadArray = []
        } else {
          breadArray = JSON.parse(breadJson)
        }

        // Search if the current page as already been visited
        const indexOfObj = breadArray.findIndex((element) => {
          if (element.pageName === this.pageName) {
            return true
          }
          return false
        })

        if (indexOfObj !== -1) {
          // If the current page as already been visited truncate the bread array
          breadArray.splice(indexOfObj + 1, breadArray.length)
          this.retriveLinks(this.pageName)
        } else if (this.$data.basePages.includes(this.pageName)) {
          // If the current page is a base page reset the breadcrumbs
          breadArray = [pageInfo]
        } else {
          // If it's a new page add it to the breadcrumbs
          breadArray.push(pageInfo)
        }
        
        // Save the updated breadcrumbs to memory
        sessionStorage.setItem('bread', JSON.stringify(breadArray))

        // Show only the last 3 elements of the breadcrumbs
        if (breadArray.length <= 3) {
          this.$data.breadLength = breadArray.length
          return breadArray
        } else {
          this.$data.breadLength = 3
          return breadArray.slice(breadArray.length - 3)
        }
      }
    },
    retriveLinks(pageName) {
      if (process.client) {
        const breadJson = sessionStorage.getItem('bread')
        let breadArray
        if (breadJson == null || breadJson === 'undefined') {
          breadArray = []
        } else {
          breadArray = JSON.parse(breadJson)
        }

        // Search if the current page as already been visited
        const indexOfObj = breadArray.findIndex((element) => {
          if (element.pageName === pageName) {
            return true
          }
          return false
        })

        // set the groupLinks to the ones that was when the user visit the page clicked
        sessionStorage.setItem('groupLinks', breadArray[indexOfObj].groupLinks)
      }
    },
  },
}
</script>
