<template>
  <div class="container-xl">
    <div
      class="row p-3 align-items-center"
      :class="{
        'flex-column-reverse flex-md-row': isLeft,
        'flex-column flex-md-row': !isLeft,
      }"
    >
      <div v-if="isLeft" class="col text-center">
        <div class="row p-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2">
          <div v-if="phone !== 'none'">
            <b>Contact</b>
            <img
              src="/images/icons/phone_icon.png"
              class="icon-img-personalize"
            />
            &nbsp; phone: &emsp; &nbsp;
            <a :href="'tel:' + phone">+39 {{ phone }}</a>
            <br />
          </div>

          <div v-if="openingHours != '00:00:00' && closingHours != '24:00:00'">
            <b>Opening hours:</b>
            <p class="lead">
              {{ openingHours.substring(0, 5) }} -
              {{ closingHours.substring(0, 5) }}
            </p>
          </div>

          <div v-if="address !== 'none'">
            <b>Address:</b>
            <br />
            <p class="lead">{{ address }}</p>
          </div>
        </div>
      </div>

      <div class="col text-center">
        <img :src="img" class="rounded-3 img-fluid" />
      </div>

      <div v-if="!isLeft" class="col text-center">
        <div class="row p-3">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2">
          <div>
            <p>desc</p>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'ImageContacts',
  props: {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
      default: 'https://dummyimage.com/600x300',
    },
    phone: {
      type: String,
      required: false,
      default: 'none',
    },
    address: {
      type: String,
      required: false,
      default: 'none',
    },
    openingHours: {
      type: String,
      required: false,
      default: 'none',
    },
    closingHours: {
      type: String,
      required: false,
      default: 'none',
    },
    isLeft:{
        type:Boolean,
        required:true,
    }
  },
}
</script>
