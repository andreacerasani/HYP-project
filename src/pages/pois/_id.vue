<template>
  <div class="container my-5">
    <div
      class="row p-4 pb-0 pe-lg-0 pt-lg-5 pb-lg-5 pe-lg-5 align-items-center rounded-3 border shadow-lg"
    >
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1">{{ title }}</h1>
        <b>Description:</b>
        <p class="lead">
          {{ description }}
        </p>
        <b>Opening hours:</b>
        <p class="lead">
          {{ opening_hours }} - {{  closing_hours }}
        </p>
        <b>Ticket:</b>
        <p class="lead">
          {{ ticket }}
        </p>
        <div
          class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"
        >
          <button
            type="button"
            class="btn btn-outline-secondary btn-lg px-4"
            @click="backToList"
          >
            Back to list
          </button>
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img class="rounded-lg-3" :src="images[0].path" alt="" width="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SinglePoiPage',
  async asyncData({ route, $axios }) {
    const { id } = route.params
    const { poi } = await $axios.get('/api/pois/' + id)
    return {
      title: poi.title,
      description: poi.description,
      opening_hours: poi.opening_hours,
      closing_hours: poi.closing_hours,
      ticket: poi.ticket,
      address: poi.address,
      images: poi.images,
    }
  },
  head(){
    return {
      title: this.name
    }
  },
  methods: {
    fromUrl(variable){
        const result = variable.replace("-", " ")
        return result
    },
    backToList() {
      this.$router.push('/points-of-interest')
    },
  },
}
</script>