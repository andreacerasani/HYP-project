<!-- Component that show the contact alongside an image -->
<template>
  <div class="container-xl">
    <div
      class="row p-3 align-items-center justify-content-evenly"
      :class="{
        'flex-column-reverse flex-md-row': isLeft,
        'flex-column flex-md-row': !isLeft,
      }"
    >
      <div v-if="isLeft" class="col text-start my-border">
        <div class="row p-3 text-center">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2 ps-5">

          <div v-if="phone !== 'none'">
            <b>Phone</b>
            <br />
            <div class="ps-4">
            <img
              src="/images/icons/phone_icon.png"
              class="icon-img-personalize"
              alt="Phone Icon"
            />
            <a :href="'tel:' + phone">+39 {{ phone }}</a>
            </div>
          </div>

          <div v-if="openingHours != '00:00:00' && closingHours != '24:00:00'">
            <b>Opening hours:</b>
            <br />
            <div class="ps-4">
            <p class="lead">
              {{ openingHours.substring(0, 5) }} -
              {{ closingHours.substring(0, 5) }}
            </p>
            </div>
          </div>

          <div v-if="address !== 'none' && address !== null">
            <b>Address:</b>
            <br />
            <div class="ps-4">
            <p class="lead">{{ address }}</p>
            </div>
          </div>


        </div>
      </div>

      <div class="col">
        <div
          class="card-image rounded-3"
          :style="{ 'background-image': 'url(' + img + ')' }"
        ></div>
      </div>

      <div v-if="!isLeft" class="col pt-2 text-start my-border">
        <div class="row p-3 text-center">
          <h3>{{ title }}</h3>
        </div>
        <div class="row p-2 ps-5">
          <div v-if="phone !== 'none'">
            <b>Phone</b>
            <br />
            <div class="ps-4">
            <img
              src="/images/icons/phone_icon.png"
              class="icon-img-personalize"
              alt="Phone Icon"
            />
            <a :href="'tel:' + phone">+39 {{ phone }}</a>
            </div>
          </div>

          <div v-if="openingHours != '00:00:00' && closingHours != '24:00:00'">
            <b>Opening hours:</b>
            <br />
            <div class="ps-4">
            <p class="lead">
              {{ openingHours.substring(0, 5) }} -
              {{ closingHours.substring(0, 5) }}
            </p>
            </div>
          </div>

          <div v-if="address !== 'none' && address !== null">
            <b>Address:</b>
            <br />
            <div class="ps-4">
            <p class="lead">{{ address }}</p>
            </div>
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
    isLeft: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
b {
  color: var(--subtitle-color);
  border-left: 6px solid var(--subtitle-color);
  padding-left: 1vw;
}
.icon-img-personalize {
  width: 2vw;
  min-width: 20px;
  height: 2vw;
  min-height: 20px;
}
.my-border {
  border-style: solid;
  border-color: var(--div-color-light);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 50vmin;
}
</style>
